import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      background: '#0b0c10',
      color: '#fff',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(230,0,0,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        letterSpacing: '0.15em',
        color: '#e60000',
        textTransform: 'uppercase',
        marginBottom: '16px',
        border: '1px solid rgba(230,0,0,0.3)',
        padding: '5px 14px',
        borderRadius: '100px',
        background: 'rgba(230,0,0,0.08)',
      }}>
        Error 404
      </p>

      <h1 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(80px, 15vw, 160px)',
        fontWeight: 900,
        lineHeight: 1,
        margin: '0 0 16px',
        background: 'linear-gradient(135deg, #e60000, #ff6666)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        404
      </h1>

      <h2 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(20px, 3vw, 28px)',
        fontWeight: 700,
        color: '#fff',
        margin: '0 0 12px',
      }}>
        Page Not Found
      </h2>

      <p style={{
        fontSize: '15px',
        color: '#a7aab7',
        maxWidth: '380px',
        lineHeight: 1.7,
        marginBottom: '36px',
      }}>
        The page you&#39;re looking for doesn&#39;t exist or has been moved. Head back to the store.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #e60000, #ff3333)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '14px',
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
          ← Back to Home
        </Link>
        <Link href="/store" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          borderRadius: '10px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
        }}>
          View Store
        </Link>
      </div>
    </div>
  );
}
