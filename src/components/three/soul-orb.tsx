'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { noise3d } from './noise.glsl';

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPos;
${noise3d}

void main() {
  vec3 p = position;
  float wobble = snoise(p * 1.6 + uTime * 0.35) * (0.035 + uHover * 0.05);
  p += normal * wobble;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vPos = p;
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uHover;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uBright;
uniform vec3 uGold;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPos;
${noise3d}

void main() {
  vec3 n = normalize(vNormal);
  float fresnel = pow(1.0 - max(dot(n, vViewDir), 0.0), 2.6);

  // Líquido espiralando dentro do orbe
  vec3 q = vPos * 1.4;
  float t = uTime * 0.18;
  vec3 warp = vec3(fbm(q + t), fbm(q + vec3(5.2, 1.3, 2.1) - t), fbm(q + vec3(1.7, 9.2, 4.4) + t * 0.5));
  float f = fbm(q + warp * 1.6);

  vec3 col = mix(uDeep, uMid, smoothstep(-0.4, 0.6, f));

  // Veias de energia
  float veins = 1.0 - smoothstep(0.0, 0.035 + uHover * 0.03, abs(f - 0.15));
  col += uBright * veins * (0.7 + uHover * 0.6);

  // Brilho dourado raro, como uma alma presa
  float sparks = smoothstep(0.62, 0.7, fbm(q * 2.5 - t * 2.0));
  col += uGold * sparks * 0.6;

  // Borda luminosa
  col += uBright * fresnel * (1.4 + uHover * 0.8);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface SoulOrbProps {
  hover: React.RefObject<number>;
}

export function SoulOrb({ hover }: SoulOrbProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uDeep: { value: new THREE.Color('#031a1a') },
      uMid: { value: new THREE.Color('#0b6b66') },
      uBright: { value: new THREE.Color('#5ff5e0') },
      uGold: { value: new THREE.Color('#ffc46b') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!material.current || !mesh.current) return;
    const u = material.current.uniforms;
    u.uTime.value += delta;
    u.uHover.value = THREE.MathUtils.damp(
      u.uHover.value,
      hover.current ?? 0,
      4,
      delta
    );
    mesh.current.rotation.y += delta * 0.08;
    // Inclina na direção do ponteiro
    const { x, y } = state.pointer;
    mesh.current.rotation.x = THREE.MathUtils.damp(
      mesh.current.rotation.x,
      -y * 0.35,
      3,
      delta
    );
    mesh.current.rotation.z = THREE.MathUtils.damp(
      mesh.current.rotation.z,
      x * 0.2,
      3,
      delta
    );
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 48]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
