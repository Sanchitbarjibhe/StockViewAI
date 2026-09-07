export default function BetaBadge() {
    const isBeta = process.env.APP_ENV === 'dev' || process.env.NEXT_PUBLIC_APP_ENV === 'beta';

    if (!isBeta) return null;

    return (
        <span
            aria-label="Beta environment"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 6px',
                border: '1px solid rgba(250, 204, 21, 0.45)',
                borderRadius: '4px',
                color: '#FDE68A',
                backgroundColor: 'rgba(161, 98, 7, 0.2)',
                fontSize: '9px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                lineHeight: 1,
                textTransform: 'uppercase',
            }}
        >
            Beta
        </span>
    );
}