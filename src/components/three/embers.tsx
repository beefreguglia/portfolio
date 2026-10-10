'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uHeight;
attribute float aSeed;
attribute float aGold;
varying float vAlpha;
varying float vGold;

void main() {
  vec3 p = position;
  float speed = 0.25 + fract(aSeed * 13.7) * 0.45;
  float life = fract(aSeed + uTime * speed / uHeight);
  p.y = -uHeight * 0.5 + life * uHeight;
  p.x += sin(uTime * (0.6 + aSeed) + aSeed * 40.0) * 0.25;
  p.z += cos(uTime * (0.5 + aSeed) + aSeed * 23.0) * 0.2;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = (2.0 + fract(aSeed * 91.3) * 5.0) * uPixelRatio;
  gl_PointSize = size * (6.0 / -mv.z);

  vAlpha = smoothstep(0.0, 0.15, life) * (1.0 - smoothstep(0.7, 1.0, life));
  vGold = aGold;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uAqua;
uniform vec3 uGold;
varying float vAlpha;
varying float vGold;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float glow = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uAqua, uGold, vGold);
  gl_FragColor = vec4(col * 1.6, glow * glow * vAlpha);
}
`;

export function Embers({ count = 260 }: { count?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const height = 8;

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const gold = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 0.9 + Math.random() * 3.6;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(a) * r - 1;
      seeds[i] = Math.random();
      gold[i] = Math.random() < 0.18 ? 1 : 0;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    g.setAttribute('aGold', new THREE.BufferAttribute(gold, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeight: { value: height },
      uPixelRatio: { value: 1 },
      uAqua: { value: new THREE.Color('#4fe3cf') },
      uGold: { value: new THREE.Color('#ffb85c') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value += delta;
    material.current.uniforms.uPixelRatio.value = state.viewport.dpr;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
