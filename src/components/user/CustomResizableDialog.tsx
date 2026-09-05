'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

// Custom Properties interface
export interface CustomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    initialWidth?: number;
    initialHeight?: number;
    minWidth?: number;
    minHeight?: number;
    children?: React.ReactNode;
    footerActions?: React.ReactNode; // Custom Functionality Buttons
    className?: string;
}

export default function CustomResizableDialog({
    isOpen,
    onClose,
    title = 'Dialog Modal',
    initialWidth = 550,
    initialHeight = 400,
    minWidth = 350,
    minHeight = 250,
    children,
    footerActions,
    className = '',
}: CustomDialogProps) {
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const isResizing = useRef(false);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const startPos = useRef({ x: 0, y: 0, w: initialWidth, h: initialHeight });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizing.current) {
                const dx = e.clientX - startPos.current.x;
                const dy = e.clientY - startPos.current.y;

                const newWidth = Math.max(minWidth, startPos.current.w + dx);
                const newHeight = Math.max(minHeight, startPos.current.h + dy);

                setSize({ width: newWidth, height: newHeight });
            }

            if (isDragging.current) {
                const dx = e.clientX - dragStart.current.x;
                const dy = e.clientY - dragStart.current.y;

                setPosition(prev => ({
                    x: prev.x + dx,
                    y: prev.y + dy,
                }));

                dragStart.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            isDragging.current = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [minWidth, minHeight]);

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            w: size.width,
            h: size.height,
        };
        document.body.style.cursor = 'se-resize';
        document.body.style.userSelect = 'none';
    };

    const startDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none" style={{ padding: '12px' }}>
            <div
                style={{
                    position: 'absolute',
                    left: isMaximized ? '0' : `${position.x}px`,
                    top: isMaximized ? '0' : `${position.y}px`,
                    width: isMaximized ? '100%' : `${size.width}px`,
                    height: isMaximized ? '100%' : `${size.height}px`,
                    pointerEvents: 'auto',
                    backgroundColor: 'rgb(15, 23, 42)',
                    border: '1px solid rgb(30, 41, 59)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 75ms linear',
                }}
                className={className}
            >
                {/* Header Section */}
                <div
                    onMouseDown={startDrag}
                    className="flex justify-between items-center px-4 py-3 bg-slate-950 border-b border-slate-800 select-none cursor-grab active:cursor-grabbing hover:bg-slate-900 transition-colors"
                >
                    <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMaximized(!isMaximized)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        >
                            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-red-950 hover:text-red-400 rounded text-slate-400"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Content Body Section */}
                <div className="flex-1 p-4 overflow-y-auto text-slate-300 text-sm">
                    {children}
                </div>

                {/* Footer / Custom Functionality Section */}
                {footerActions && (
                    <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex justify-end gap-2">
                        {footerActions}
                    </div>
                )}

                {/* Bottom Right Resize Handle Handle */}
                {!isMaximized && (
                    <div
                        onMouseDown={startResize}
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center group"
                    >
                        <div className="w-2 h-2 border-r-2 border-b-2 border-slate-600 group-hover:border-emerald-400 transition" />
                    </div>
                )}
            </div>
        </div>
    );
}