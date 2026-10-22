'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers } from 'lucide-react';

interface Ceramic3DViewerProps {
  modelType?: 'vase' | 'cup' | 'bowl' | 'pitcher';
  initialGlaze?: string;
  interactive?: boolean;
}

export default function Ceramic3DViewer({
  modelType = 'vase',
  initialGlaze = 'terracotta',
  interactive = true,
}: Ceramic3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGlaze, setActiveGlaze] = useState(initialGlaze);
  const [activeModel, setActiveModel] = useState(modelType);
  const [isRotating, setIsRotating] = useState(true);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const meshRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffeedd, 3.5);
    mainSpot.position.set(4, 7, 5);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.6;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0); // Gold champagne rim reflection
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xa5b49b, 1.0); // Sage fill reflection
    fillLight.position.set(2, -2, -2);
    scene.add(fillLight);

    // Group for objects
    const ceramicGroup = new THREE.Group();
    scene.add(ceramicGroup);
    meshRef.current = ceramicGroup;

    // Material builder based on glaze
    const getMaterial = (glaze: string) => {
      let color = 0xc0745a; // Terracotta default
      let roughness = 0.35;
      let metalness = 0.05;
      let clearcoat = 0.4;
      let clearcoatRoughness = 0.2;

      if (glaze === 'cobalt') {
        color = 0x1e3a8a;
        roughness = 0.2;
        clearcoat = 0.8;
      } else if (glaze === 'ivory') {
        color = 0xf5ede1;
        roughness = 0.4;
        clearcoat = 0.3;
      } else if (glaze === 'sage') {
        color = 0x6e7e60;
        roughness = 0.3;
        clearcoat = 0.5;
      } else if (glaze === 'gold-lustre') {
        color = 0xc2a06e;
        roughness = 0.25;
        metalness = 0.4;
        clearcoat = 0.7;
      }

      return new THREE.MeshPhysicalMaterial({
        color,
        roughness,
        metalness,
        clearcoat,
        clearcoatRoughness,
        reflectivity: 0.8,
      });
    };

    const ceramicMaterial = getMaterial(activeGlaze);

    // Construct shapes using LatheGeometry for authentic handcrafted pottery profiles
    const createPottery = (type: string) => {
      while (ceramicGroup.children.length > 0) {
        ceramicGroup.remove(ceramicGroup.children[0]);
      }

      const points: THREE.Vector2[] = [];

      if (type === 'vase') {
        // Elegant fluted classical vase profile
        points.push(new THREE.Vector2(0, -1.2));
        points.push(new THREE.Vector2(0.65, -1.2));
        points.push(new THREE.Vector2(0.85, -0.6));
        points.push(new THREE.Vector2(0.95, 0.0));
        points.push(new THREE.Vector2(0.6, 0.7));
        points.push(new THREE.Vector2(0.42, 1.1));
        points.push(new THREE.Vector2(0.58, 1.35));
        points.push(new THREE.Vector2(0.52, 1.4));
        points.push(new THREE.Vector2(0.38, 1.3));
        points.push(new THREE.Vector2(0.32, 1.0));
        points.push(new THREE.Vector2(0.0, 0.9));
      } else if (type === 'cup') {
        // Artisanal flared belly coffee cup
        points.push(new THREE.Vector2(0, -0.8));
        points.push(new THREE.Vector2(0.55, -0.8));
        points.push(new THREE.Vector2(0.78, -0.3));
        points.push(new THREE.Vector2(0.85, 0.4));
        points.push(new THREE.Vector2(0.88, 0.75));
        points.push(new THREE.Vector2(0.83, 0.77));
        points.push(new THREE.Vector2(0.75, 0.5));
        points.push(new THREE.Vector2(0.65, -0.6));
        points.push(new THREE.Vector2(0, -0.6));
      } else if (type === 'bowl') {
        // Shallow organic pasta/salad bowl
        points.push(new THREE.Vector2(0, -0.5));
        points.push(new THREE.Vector2(0.6, -0.5));
        points.push(new THREE.Vector2(1.1, -0.2));
        points.push(new THREE.Vector2(1.5, 0.3));
        points.push(new THREE.Vector2(1.45, 0.35));
        points.push(new THREE.Vector2(1.0, -0.1));
        points.push(new THREE.Vector2(0.5, -0.38));
        points.push(new THREE.Vector2(0, -0.38));
      } else {
        // Pitcher / kettle
        points.push(new THREE.Vector2(0, -1.0));
        points.push(new THREE.Vector2(0.8, -1.0));
        points.push(new THREE.Vector2(1.05, -0.2));
        points.push(new THREE.Vector2(0.95, 0.5));
        points.push(new THREE.Vector2(0.55, 1.0));
        points.push(new THREE.Vector2(0.6, 1.3));
        points.push(new THREE.Vector2(0.52, 1.33));
        points.push(new THREE.Vector2(0.45, 1.0));
        points.push(new THREE.Vector2(0, 0.8));
      }

      const geometry = new THREE.LatheGeometry(points, 48);
      const mainMesh = new THREE.Mesh(geometry, ceramicMaterial);
      mainMesh.castShadow = true;
      mainMesh.receiveShadow = true;
      ceramicGroup.add(mainMesh);

      // Gold rim accent ring
      const goldRimMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.85,
        roughness: 0.2,
      });
      const topY = type === 'vase' ? 1.37 : type === 'cup' ? 0.76 : type === 'bowl' ? 0.33 : 1.31;
      const topRadius = type === 'vase' ? 0.55 : type === 'cup' ? 0.86 : type === 'bowl' ? 1.48 : 0.58;
      const rimGeom = new THREE.TorusGeometry(topRadius, 0.02, 16, 48);
      rimGeom.rotateX(Math.PI / 2);
      const rimMesh = new THREE.Mesh(rimGeom, goldRimMat);
      rimMesh.position.y = topY;
      ceramicGroup.add(rimMesh);

      // Add handle for cup or pitcher
      if (type === 'cup' || type === 'pitcher') {
        const handleCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.82, 0.5, 0),
          new THREE.Vector3(1.3, 0.2, 0),
          new THREE.Vector3(1.2, -0.3, 0),
          new THREE.Vector3(0.75, -0.5, 0),
        ]);
        const handleGeom = new THREE.TubeGeometry(handleCurve, 32, 0.08, 12, false);
        const handleMesh = new THREE.Mesh(handleGeom, ceramicMaterial);
        handleMesh.castShadow = true;
        ceramicGroup.add(handleMesh);
      }

      // Studio pedestal shadow disc
      const shadowDiscGeom = new THREE.CircleGeometry(1.6, 32);
      shadowDiscGeom.rotateX(-Math.PI / 2);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
      const shadowMesh = new THREE.Mesh(shadowDiscGeom, shadowMat);
      shadowMesh.position.y = -1.21;
      shadowMesh.receiveShadow = true;
      ceramicGroup.add(shadowMesh);
    };

    createPottery(activeModel);

    // Mouse drag interaction
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, meshRef.current.rotation.x + deltaY * 0.01));
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch interaction for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !meshRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
      meshRef.current.rotation.y += deltaX * 0.012;
      meshRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, meshRef.current.rotation.x + deltaY * 0.012));
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    if (interactive) {
      currentMount.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      currentMount.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (meshRef.current && isRotating && !isDraggingRef.current) {
        meshRef.current.rotation.y += 0.007; // Gentle continuous turntable rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        currentMount.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        currentMount.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [activeGlaze, activeModel, isRotating, interactive]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none group">
      {/* 3D Canvas Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[320px] sm:h-[400px] md:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating Interactive Controls */}
      {interactive && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EAE2D7] shadow-sm text-xs text-[#2C221E] z-10 transition-opacity opacity-90 group-hover:opacity-100">
          {/* Glaze selector pills */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-[#EAE2D7]">
            <span className="text-[10px] uppercase tracking-wider text-[#82926E] font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C2A06E]" /> Glaze
            </span>
            <button
              onClick={() => setActiveGlaze('terracotta')}
              title="Terracotta Glaze"
              className={`w-4 h-4 rounded-full border transition-transform ${
                activeGlaze === 'terracotta'
                  ? 'scale-125 border-[#2C221E] ring-1 ring-[#C0745A]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#C0745A' }}
            />
            <button
              onClick={() => setActiveGlaze('sage')}
              title="Periyar Sage Glaze"
              className={`w-4 h-4 rounded-full border transition-transform ${
                activeGlaze === 'sage'
                  ? 'scale-125 border-[#2C221E] ring-1 ring-[#6E7E60]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#6E7E60' }}
            />
            <button
              onClick={() => setActiveGlaze('ivory')}
              title="Matte Sand Ivory"
              className={`w-4 h-4 rounded-full border transition-transform ${
                activeGlaze === 'ivory'
                  ? 'scale-125 border-[#2C221E] ring-1 ring-[#EFE4D6]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#EFE4D6' }}
            />
            <button
              onClick={() => setActiveGlaze('cobalt')}
              title="Mughal Cobalt Glaze"
              className={`w-4 h-4 rounded-full border transition-transform ${
                activeGlaze === 'cobalt'
                  ? 'scale-125 border-[#2C221E] ring-1 ring-[#1E3A8A]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#1E3A8A' }}
            />
          </div>

          {/* Model Shape switcher */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => setActiveModel('vase')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeModel === 'vase'
                  ? 'bg-[#2C221E] text-white'
                  : 'text-[#5F6B4F] hover:bg-[#FAF7F2]'
              }`}
            >
              Vase
            </button>
            <button
              onClick={() => setActiveModel('cup')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeModel === 'cup'
                  ? 'bg-[#2C221E] text-white'
                  : 'text-[#5F6B4F] hover:bg-[#FAF7F2]'
              }`}
            >
              Cup
            </button>
            <button
              onClick={() => setActiveModel('bowl')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeModel === 'bowl'
                  ? 'bg-[#2C221E] text-white'
                  : 'text-[#5F6B4F] hover:bg-[#FAF7F2]'
              }`}
            >
              Bowl
            </button>
          </div>

          {/* Auto rotate toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
            className="p-1 rounded-full text-[#5F6B4F] hover:text-[#2C221E] hover:bg-[#FAF7F2] transition-colors ml-1"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </button>
        </div>
      )}

      {/* Subtle guide hint */}
      <div className="absolute top-3 right-3 text-[10px] tracking-wider uppercase text-[#82926E] bg-white/70 px-2 py-1 rounded border border-[#EAE2D7]/60 pointer-events-none">
        360° Studio View • Drag to Inspect
      </div>
    </div>
  );
}
