import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchFeed = createAsyncThunk('matches/fetchFeed', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await axios.get(`${API_URL}/discovery/feed`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Fetch feed failed');
  }
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    recommended: [],
    nearby: [],
    recentlyJoined: [],
    premium: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload.recommended;
        state.nearby = action.payload.nearby;
        state.recentlyJoined = action.payload.recently_joined;
        state.premium = action.payload.premium;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default matchesSlice.reducer;
