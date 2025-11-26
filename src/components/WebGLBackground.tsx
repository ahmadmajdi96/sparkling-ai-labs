import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle system
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00D9FF);
    const color2 = new THREE.Color(0x3B82F6);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(300 * 3);
    
    for (let i = 0; i < 300 * 3; i += 3) {
      linePositions[i] = (Math.random() - 0.5) * 80;
      linePositions[i + 1] = (Math.random() - 0.5) * 80;
      linePositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 50;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particles.rotation.y += 0.0005;
      particles.rotation.x = mousePosition.current.y * 0.1;
      particles.rotation.y += mousePosition.current.x * 0.05;

      lines.rotation.y -= 0.0003;
      lines.rotation.x = mousePosition.current.y * 0.05;

      camera.position.x += (mousePosition.current.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.current.y * 5 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 8%), hsl(220 18% 12%))' }}
    />
  );
};
