import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminDashboard() {
  const navItems = [
    { path: '/admin-dashboard/category', label: '📂 Category' },
    { path: '/admin-dashboard/post', label: '📝 Post' },
    { path: '/admin-dashboard/challenge', label: '🏆 Challenge' },
    { path: '/admin-dashboard/user', label: '👤 User' },
    { path: '/admin-dashboard/leaderboard', label: '🥇 Leaderboard' },
  ];

  return (
    <div className="d-flex" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <aside
        className="text-white d-flex flex-column shadow"
        style={{
          width: '260px',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '30px 20px',
          backgroundColor: '#69bdd2',
        }}
      >
        <div>
          {/* Branding */}
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1">🎯 Hobby Buddy</h4>
            <small className="fst-italic">YOUR INTEREST, YOUR ARENA</small>
          </div>

          {/* Navigation */}
          <nav className="mt-5">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `mb-3 btn w-100 text-start px-3 py-2 rounded-3 fw-semibold ${
                    isActive ? 'btn-light text-dark' : 'btn-outline-light'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Page Content */}
      <main
        className="flex-grow-1 p-4"
        style={{
          marginLeft: '260px',
          minHeight: '100vh',
          color: '#000',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
