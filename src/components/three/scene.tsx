'use client';

import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { Embers } from './embers';
import { GlassShell } from './glass-shell';
import { SoulOrb } from './soul-orb';

interface SanctuarySceneProps {
  active: boolean;
  hover: React.RefObject<number>;
  compact: boolean;
}

export default function SanctuaryScene({
  active,
  hover,
  compact,
}: SanctuarySceneProps) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, compact ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <group position={[0, 0, 0]}>
          <SoulOrb hover={hover} />
          <GlassShell hover={hover} />
        </group>
        <Embers count={compact ? 120 : 260} />
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.85}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.3}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
