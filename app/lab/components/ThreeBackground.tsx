"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    // Torus Knot
    const geometry = new THREE.TorusKnotGeometry(9, 2.5, 120, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x888888,
      emissive: 0x000000,
      metalness: 0.5,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Spark particles
    const sparkCount = 100;
    const sparkGeo = new THREE.CircleGeometry(0.15, 3);
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 1,
      depthTest: false,
    });
    const sparks = new THREE.InstancedMesh(sparkGeo, sparkMat, sparkCount);
    torusKnot.add(sparks);

    const dummy = new THREE.Object3D();
    const sparkData: Array<{
      speed: number;
      progress: number;
      pathIndex: number;
    }> = [];
    const radialSegments = 16;
    const tubularSegments = 120;

    for (let i = 0; i < sparkCount; i++) {
      sparkData.push({
        speed: 0.001 + Math.random() * 0.002,
        progress: Math.random(),
        pathIndex: Math.floor(Math.random() * radialSegments),
      });
    }

    const posAttribute = geometry.attributes.position;
    const stride = radialSegments + 1;
    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();

    function updateSparks() {
      sparkData.forEach((spark, i) => {
        spark.progress += spark.speed;
        if (spark.progress >= 1) spark.progress = 0;

        const exactInd = spark.progress * tubularSegments;
        const u = Math.floor(exactInd);
        const nextU = (u + 1) % tubularSegments;
        const v = spark.pathIndex;

        const idx1 = (u * stride + v) * 3;
        const idx2 = (nextU * stride + v) * 3;

        const posArray = posAttribute.array as Float32Array;
        v1.set(posArray[idx1], posArray[idx1 + 1], posArray[idx1 + 2]);
        v2.set(posArray[idx2], posArray[idx2 + 1], posArray[idx2 + 2]);
        v1.lerp(v2, exactInd - u);

        dummy.position.copy(v1);
        dummy.lookAt(v2);
        dummy.updateMatrix();
        sparks.setMatrixAt(i, dummy.matrix);
      });
      sparks.instanceMatrix.needsUpdate = true;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pLight1 = new THREE.PointLight(0xd4af37, 1, 50);
    pLight1.position.set(10, 10, 10);
    scene.add(pLight1);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - windowHalfX) * 0.0005;
      mouseY = (e.clientY - windowHalfY) * 0.0005;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const targetX = mouseX * 0.5;
      const targetY = mouseY * 0.5;

      torusKnot.rotation.y +=
        0.05 * (targetX - torusKnot.rotation.y) + 0.002;
      torusKnot.rotation.x +=
        0.05 * (targetY - torusKnot.rotation.x) + 0.001;

      updateSparks();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} id="canvas-container" />;
}
