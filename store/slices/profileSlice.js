import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchMyProfile = createAsyncThunk('profile/fetchMy', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const response = await axios.get(`${API_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Fetch profile failed');
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
