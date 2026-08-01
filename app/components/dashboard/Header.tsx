import React, { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Mail } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: (e?: React.FormEvent) => void;
    isAuthenticated: boolean;
    userEmail?: string;
    userImage?: string;
    onOpenAuth: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch, isAuthenticated, userEmail, userImage, onOpenAuth, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
                <h1 style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.6px', margin: 0, color: '#F8FAFC' }}>
                    NEO<span style={{ color: '#22C55E' }}>TERMINAL</span>
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <form onSubmit={handleSearch} className="header-form" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="top-search-container" style={{ position: 'relative', width: '200px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                        <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: '#64748B' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search (E.g. RELIANCE, HDFCBANK)"
                            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', padding: '6px 10px 6px 30px', color: '#FFF', fontSize: '11px', outline: 'none' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#22C55E', color: '#0B0F17', border: 'none', borderRadius: '8px', fontSize: '10px', fontWeight: '800' }}>
                        SEARCH
                    </button>
                </form>


                {isAuthenticated ? (
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
                            <img
                                src={userImage || `https://ui-avatars.com/api/?name=${userEmail || 'T'}&background=22C55E&color=0B0F17&bold=true`}
                                alt="User Profile"
                                style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #334155' }}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '45px',
                                width: '220px',
                                backgroundColor: '#161B22',
                                border: '1px solid #30363D',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                zIndex: 10,
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderBottom: '1px solid #30363D' }}>
                                    <Mail size={14} color="#94A3B8" />
                                    <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {userEmail || 'trader@neo.terminal'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: 'none',
                                        border: 'none',
                                        color: '#F87171',
                                        padding: '8px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        width: '100%',
                                        fontSize: '12px',
                                        fontWeight: 600
                                    }}
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button type="button" onClick={onOpenAuth} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#1E293B', color: '#F8FAFC', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px', fontWeight: '800' }}>
                        LOGIN
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;