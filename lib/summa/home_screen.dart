// lib/features/3_public_pages/home/home_screen.dart

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/features/3_public_pages/profile/profile_screen.dart';
import 'package:flutter_application_1/features/3_public_pages/notifications/notification_screen.dart';
import 'package:flutter_application_1/features/4_customer_dashboard\\home/dashboard_home_screen.dart';



class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with TickerProviderStateMixin {
  final PageController _heroController = PageController();
  int _heroIndex = 0;
  Timer? _heroTimer;

  int _bottomIndex = 0;

  final List<String> _heroImages = [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1526318472351-c75fcf0701e8?auto=format&fit=crop&w=1200&q=60',
  ];

  final List<Map<String, String>> _offers = [
    {
      'title': 'Term Life — ₹1 Cr',
      'subtitle': 'Affordable premiums from ₹400/mo',
      'image':
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60'
    },
    {
      'title': 'Health Plus',
      'subtitle': 'Family & Individual plans',
      'image':
          'https://images.unsplash.com/photo-1582719478250-8f7a5c9d5b1d?auto=format&fit=crop&w=800&q=60'
    },
  ];

  final List<Map<String, dynamic>> _activePolicies = [
    {
      'name': 'Family Health',
      'policyNo': 'HLT-12345',
      'expiry': 'Dec 2026',
      'amount': '₹4,50,000'
    },
    {
      'name': 'Term Life',
      'policyNo': 'LIF-98765',
      'expiry': 'Mar 2030',
      'amount': '₹1,00,00,000'
    },
  ];

  @override
  void initState() {
    super.initState();

    _heroTimer =
        Timer.periodic(const Duration(seconds: 4), (Timer timer) {
      if (_heroController.hasClients) {
        final next = (_heroIndex + 1) % _heroImages.length;
        _heroController.animateToPage(
          next,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    });

    _heroController.addListener(() {
      final p = _heroController.page;
      if (p != null) {
        setState(() => _heroIndex = p.round());
      }
    });
  }

  @override
  void dispose() {
    _heroTimer?.cancel();
    _heroController.dispose();
    super.dispose();
  }

  bool _isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 800;

  @override
  Widget build(BuildContext context) {
    final isMobile = _isMobile(context);

    return Scaffold(
      extendBody: true,
      backgroundColor: const Color(0xFFF8F8F8),
      body: SafeArea(
        child: Stack(
          children: [
            CustomScrollView(
              slivers: [
                SliverToBoxAdapter(child: _buildTopHeader()),
                SliverToBoxAdapter(child: _buildSearchAndSummary()),
                SliverToBoxAdapter(child: _buildHeroSlider(isMobile)),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildFeatureCards()),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildQuickActions()),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildOffers()),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildActivePolicies()),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildRecommendedPlans()),
                const SliverToBoxAdapter(child: SizedBox(height: 18)),
                SliverToBoxAdapter(child: _buildTipsAndSupport()),
                const SliverToBoxAdapter(child: SizedBox(height: 120)),
              ],
            ),

            Positioned(
              left: 16,
              right: 16,
              bottom: 16,
              child: _buildFloatingBottomNav(),
            ),

            Positioned(
              right: 26,
              bottom: 100,
              child: FloatingActionButton.extended(
                onPressed: () {},
                label: const Text('Help'),
                icon: const Icon(Icons.chat_bubble_outline),
                backgroundColor: Colors.blue.shade700,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // -----------------------------------------------------------------------
  // TOP HEADER
  // -----------------------------------------------------------------------
  Widget _buildTopHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 8),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ProfileScreen()),
              );
            },
            child: const CircleAvatar(
              radius: 26,
              backgroundImage: NetworkImage(
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60',
              ),
            ),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Suresh',
                  style:
                      TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              SizedBox(height: 4),
              Text("We're glad to have you back.",
                  style: TextStyle(fontSize: 13, color: Colors.black54)),
            ],
          ),
          const Spacer(),
          IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (_) => const NotificationScreen()),
              );
            },
            icon: Stack(
              children: [
                const Icon(Icons.notifications_none, size: 28),
                Positioned(
                  right: 0,
                  top: 0,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                        color: Colors.red.shade600,
                        shape: BoxShape.circle),
                    child: const SizedBox(width: 6, height: 6),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // SEARCH BAR + PREMIUM SUMMARY
  // -----------------------------------------------------------------------
  Widget _buildSearchAndSummary() {
    return Padding(
      padding:
          const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 46,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: const [
                      BoxShadow(
                          color: Colors.black12, blurRadius: 6)
                    ],
                  ),
                  child: Row(
                    children: const [
                      Icon(Icons.search_outlined),
                      SizedBox(width: 10),
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText:
                                'Search policies, claims, docs...',
                            border: InputBorder.none,
                            isCollapsed: true,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Container(
                height: 46,
                width: 46,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: const [
                      BoxShadow(
                          color: Colors.black12, blurRadius: 6)
                    ]),
                child: IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.qr_code)),
              )
            ],
          ),
          const SizedBox(height: 12),

          // Premium Summary
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              boxShadow: const [
                BoxShadow(color: Colors.black12, blurRadius: 8)
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Total Premium Due',
                            style: TextStyle(
                                fontSize: 13,
                                color: Colors.black54)),
                        SizedBox(height: 6),
                        Text('₹2,850',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold)),
                        SizedBox(height: 4),
                        Text('Next due: 15 Dec 2025',
                            style: TextStyle(
                                fontSize: 12,
                                color: Colors.black45)),
                      ]),
                ),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue.shade700,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text('Pay Now'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // HERO SLIDER
  // -----------------------------------------------------------------------
  Widget _buildHeroSlider(bool isMobile) {
    return Padding(
      padding:
          const EdgeInsets.symmetric(horizontal: 16),
      child: SizedBox(
        height: isMobile ? 200 : 300,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: PageView.builder(
            controller: _heroController,
            itemCount: _heroImages.length,
            itemBuilder: (_, i) {
              return Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    _heroImages[i],
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.center,
                        colors: [
                          Colors.black.withOpacity(0.45),
                          Colors.transparent
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    left: 16,
                    bottom: 18,
                    child: Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: const [
                        Text('Protect what matters',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight:
                                    FontWeight.w700)),
                        SizedBox(height: 6),
                        Text(
                            'Great deals on Health & Life plans',
                            style: TextStyle(
                                color: Colors.white70)),
                      ],
                    ),
                  )
                ],
              );
            },
          ),
        ),
      ),
    );
  }

  // -----------------------------------------------------------------------
  // FEATURE CARDS
  // -----------------------------------------------------------------------
  Widget _buildFeatureCards() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                  child: _featureCard(
                      Icons.health_and_safety,
                      'Health Insurance',
                      'Covers medical & hospitalization',
                      Colors.blueAccent)),
              const SizedBox(width: 12),
              Expanded(
                  child: _featureCard(
                      Icons.favorite,
                      'Life Insurance',
                      'Term & ULIP options',
                      Colors.redAccent)),
            ],
          )
        ],
      ),
    );
  }

  Widget _featureCard(
      IconData icon,
      String title,
      String subtitle,
      Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          boxShadow: const [
            BoxShadow(color: Colors.black12, blurRadius: 8)
          ]),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.14),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, size: 26, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment:
                  CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 4),
                Text(subtitle,
                    style: const TextStyle(
                        fontSize: 12,
                        color: Colors.black54)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // QUICK ACTION GRID
  // -----------------------------------------------------------------------
  Widget _buildQuickActions() {
    final items = [
      {'icon': Icons.shield, 'label': 'Claims'},
      {'icon': Icons.document_scanner, 'label': 'My Docs'},
      {'icon': Icons.support_agent, 'label': 'Support'},
      {'icon': Icons.local_hospital, 'label': 'Health'},
      {'icon': Icons.flight, 'label': 'Travel'},
      {'icon': Icons.directions_car, 'label': 'Car'},
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        padding: const EdgeInsets.only(top: 6),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: items.length,
        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 0.95,
        ),
        itemBuilder: (_, i) {
          final it = items[i];
          return Column(
            children: [
              GestureDetector(
                onTap: () {
                  debugPrint('Tapped ${it['label']}');
                },
                child: Container(
                  height: 62,
                  width: 62,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: const [
                      BoxShadow(
                          color: Colors.black12,
                          blurRadius: 6)
                    ],
                  ),
                  child: Icon(
                    it['icon'] as IconData,
                    size: 30,
                    color: Colors.blueGrey.shade900,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                it['label'] as String,
                style: const TextStyle(fontSize: 13),
              ),
            ],
          );
        },
      ),
    );
  }

  // -----------------------------------------------------------------------
  // OFFERS
  // -----------------------------------------------------------------------
  Widget _buildOffers() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: [
              const Text('Latest offers',
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600)),
              const Spacer(),
              TextButton(
                  onPressed: () {},
                  child: const Text('See all')),
            ],
          ),
        ),
        SizedBox(
          height: 120,
          child: ListView.separated(
            padding:
                const EdgeInsets.symmetric(horizontal: 12),
            scrollDirection: Axis.horizontal,
            itemCount: _offers.length,
            separatorBuilder: (_, __) =>
                const SizedBox(width: 12),
            itemBuilder: (_, i) {
              final o = _offers[i];
              return Container(
                width: 300,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: const [
                      BoxShadow(
                          color: Colors.black12,
                          blurRadius: 8)
                    ]),
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius:
                          const BorderRadius.horizontal(
                              left: Radius.circular(12)),
                      child: Image.network(
                        o['image']!,
                        width: 110,
                        height: 110,
                        fit: BoxFit.cover,
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Text(o['title']!,
                                style: const TextStyle(
                                    fontWeight:
                                        FontWeight.bold)),
                            const SizedBox(height: 6),
                            Text(o['subtitle']!,
                                style: const TextStyle(
                                    fontSize: 12,
                                    color: Colors.black54)),
                            const Spacer(),
                            Text(
                              'Learn more',
                              style: TextStyle(
                                  color:
                                      Colors.blue.shade700),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // -----------------------------------------------------------------------
  // ACTIVE POLICIES
  // -----------------------------------------------------------------------
  Widget _buildActivePolicies() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: const [
              Text('Active Policies',
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600)),
              Spacer(),
              SizedBox(),
            ],
          ),
        ),
        SizedBox(
          height: 140,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(
                horizontal: 12, vertical: 8),
            scrollDirection: Axis.horizontal,
            itemCount: _activePolicies.length,
            separatorBuilder: (_, __) =>
                const SizedBox(width: 12),
            itemBuilder: (_, i) {
              final p = _activePolicies[i];
              return Container(
                width: 260,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius:
                      BorderRadius.circular(12),
                  boxShadow: const [
                    BoxShadow(
                        color: Colors.black12,
                        blurRadius: 8)
                  ],
                ),
                child: Column(
                  crossAxisAlignment:
                      CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(p['name'],
                            style: const TextStyle(
                                fontWeight:
                                    FontWeight.bold)),
                        const Spacer(),
                        Text(p['expiry'],
                            style: const TextStyle(
                                fontSize: 12,
                                color: Colors.black54)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text('Policy No: ${p['policyNo']}',
                        style: const TextStyle(
                            fontSize: 12,
                            color: Colors.black54)),
                    const Spacer(),
                    Row(
                      children: [
                        Text(p['amount'],
                            style: const TextStyle(
                                fontWeight:
                                    FontWeight.bold)),
                        const Spacer(),
                        TextButton(
                          onPressed: () {},
                          child: const Text('View'),
                        ),
                      ],
                    )
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // -----------------------------------------------------------------------
  // RECOMMENDED PLANS
  // -----------------------------------------------------------------------
  Widget _buildRecommendedPlans() {
    final plans = [
      {
        'title': 'Term Plus',
        'desc': 'High cover, low premium',
        'price': '₹350/mo'
      },
      {
        'title': 'Health Family',
        'desc': 'Covers family up to 4',
        'price': '₹1,200/mo'
      }
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment:
            CrossAxisAlignment.start,
        children: [
          const Text('Recommended for you',
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600)),
          const SizedBox(height: 12),
          Column(
            children: plans.map((pl) {
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius:
                        BorderRadius.circular(12),
                    boxShadow: const [
                      BoxShadow(
                          color: Colors.black12,
                          blurRadius: 8)
                    ]),
                child: Row(
                  children: [
                    Container(
                      height: 56,
                      width: 56,
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        borderRadius:
                            BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.recommend,
                          size: 28),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,
                        children: [
                          Text(pl['title']!,
                              style: const TextStyle(
                                  fontWeight:
                                      FontWeight.w700)),
                          const SizedBox(height: 4),
                          Text(pl['desc']!,
                              style: const TextStyle(
                                  fontSize: 12,
                                  color: Colors.black54)),
                        ],
                      ),
                    ),
                    Column(
                      children: [
                        Text(pl['price']!,
                            style: const TextStyle(
                                fontWeight:
                                    FontWeight.bold)),
                        const SizedBox(height: 6),
                        ElevatedButton(
                          onPressed: () {},
                          child: const Text('Buy'),
                        ),
                      ],
                    )
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // INSURANCE TIPS CARD
  // -----------------------------------------------------------------------
  Widget _buildTipsAndSupport() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius:
                  BorderRadius.circular(12),
              boxShadow: const [
                BoxShadow(
                    color: Colors.black12,
                    blurRadius: 8)
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment:
                        CrossAxisAlignment.start,
                    children: const [
                      Text('Insurance Tips',
                          style: TextStyle(
                              fontWeight:
                                  FontWeight.w700)),
                      SizedBox(height: 8),
                      Text(
                          'How to maximise your claims & save on premiums',
                          style: TextStyle(
                              fontSize: 13,
                              color: Colors.black54)),
                    ],
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                      backgroundColor:
                          Colors.blue.shade700),
                  child: const Text('Read'),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // FLOATING BOTTOM NAV BAR
  // -----------------------------------------------------------------------
  Widget _buildFloatingBottomNav() {
    return Container(
      height: 72,
      decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.circular(30),
          boxShadow: const [
            BoxShadow(
                color: Colors.black26,
                blurRadius: 12)
          ]),
      child: Row(
        mainAxisAlignment:
            MainAxisAlignment.spaceEvenly,
        children: [
          _navItem(
              icon: Icons.home,
              label: 'Home',
              index: 0),
          _navItem(
              icon: Icons.receipt_long,
              label: 'My Policies',
              index: 1),
          _navItem(
              icon: Icons.policy,
              label: 'Insurance',
              index: 2),
          _navItem(
              icon: Icons.person,
              label: 'Profile',
              index: 3),
        ],
      ),
    );
  }

  // -----------------------------------------------------------------------
  // NAV ITEM WITH DASHBOARD ROUTING FIXED ✔
  // -----------------------------------------------------------------------
  Widget _navItem({
    required IconData icon,
    required String label,
    required int index,
  }) {
    final active = _bottomIndex == index;

    return GestureDetector(
      onTap: () {
        setState(() => _bottomIndex = index);

        if (index == 3) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => const ProfileScreen(),
            ),
          );

        } else if (index == 1) {
          // 🚀 FIXED → My Policies → Dashboard Screen
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => DashboardHomeScreen(),

            ),
          );

        } else if (index == 2) {
          debugPrint('Insurance Clicked');

        } else {
          // index 0 = Home
        }
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 10),
          Icon(icon,
              size: 22,
              color: active
                  ? Colors.white
                  : Colors.white54),
          const SizedBox(height: 6),
          Text(
            label,
            style: TextStyle(
                color: active
                    ? Colors.white
                    : Colors.white54,
                fontSize: 12),
          ),
        ],
      ),
    );
  }
}

