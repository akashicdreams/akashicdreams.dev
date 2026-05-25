import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'akashic dreams - software & visual studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#000',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Subtle grid lines */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: 600,
                        height: 600,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 1 }}>
                    <div
                        style={{
                            fontSize: 13,
                            letterSpacing: '0.4em',
                            color: '#666',
                            textTransform: 'lowercase',
                            fontWeight: 600,
                        }}
                    >
                        software & visual studio
                    </div>

                    <div
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            color: '#fff',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.9,
                            textAlign: 'center',
                        }}
                    >
                        akashic
                        <br />
                        dreams
                    </div>

                    <div
                        style={{
                            marginTop: 20,
                            fontSize: 18,
                            color: '#555',
                            letterSpacing: '0.25em',
                            textTransform: 'lowercase',
                        }}
                    >
                        akashicdreams.dev
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
