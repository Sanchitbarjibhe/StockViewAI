import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: (e?: React.FormEvent) => void;
    isAuthenticated: boolean;
    userEmail?: string;
    onOpenAuth: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch, isAuthenticated, userEmail, onOpenAuth, onLogout }) => {
    return (
        <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                <h1 style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.6px', margin: 0, color: '#F8FAFC' }}>
                    NEO<span style={{ color: '#22C55E' }}>TERMINAL</span>
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <form onSubmit={handleSearch} className="header-form" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="top-search-container" style={{ position: 'relative', width: '200px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                        <Search style={{ position: 'absolute', left: '10px', top: '7px', width: '13px', height: '13px', color: '#64748B' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Stock Search (E. RELIANCE, HDFCBANK...)"
                            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', padding: '6px 10px 6px 30px', color: '#FFF', fontSize: '11px', outline: 'none' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', borderRadius: '8px', fontSize: '10px', fontWeight: '800' }}>
                        SEARCH
                    </button>
                </form>


                {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#94A3B8', fontSize: '11px' }}>
                            {userEmail || 'Trader'}
                        </span>
                        <button
                            type="button"
                            onClick={onLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onOpenAuth}
                        style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#22C55E', color: '#000F17' }}
                    >
                        LOG IN
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;