'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLocal;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  vLocal = position;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const fragmentShader = /* glsl */ `
uniform float uHover;
uniform vec3 uRim;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLocal;

void main() {
  vec3 n = normalize(vNormal);
  float facing = max(dot(n, vViewDir), 0.0);

  // Borda de vidro: fina e brilhante, como o globo de um orbe de vida/mana
  float rim = pow(1.0 - facing, 4.0);

  // Reflexo especular fixo no alto à esquerda
  vec3 lightDir = normalize(vec3(-0.5, 0.65, 0.6));
  float spec = pow(max(dot(reflect(-lightDir, n), vViewDir), 0.0), 40.0);

  // Faixa curva de reflexo na parte de baixo (luz rebatida)
  float bounce = smoothstep(0.55, 0.95, -vLocal.y) * pow(1.0 - facing, 2.0) * 0.35;

  vec3 col = uRim * rim * (0.9 + uHover * 0.5) + vec3(1.0) * spec * 0.9 + uRim * bounce;
  float alpha = clamp(rim * 0.85 + spec + bounce, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

/** Globo de vidro ao redor do líquido: é o que faz parecer um orbe, não um planeta. */
export function GlassShell({ hover }: { hover: React.RefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uHover: { value: 0 },
      uRim: { value: new THREE.Color('#9ffcef') },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uHover.value = THREE.MathUtils.damp(
      u.uHover.value,
      hover.current ?? 0,
      4,
      delta
    );
  });

  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
