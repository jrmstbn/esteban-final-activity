import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// WebGL Background Component
const WebGLBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      color: 0xf2c894,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create animated geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(8, 0),
      new THREE.OctahedronGeometry(6, 0),
      new THREE.TetrahedronGeometry(5, 0),
    ];

    const meshes = [];

    geometries.forEach((geometry, i) => {
      const material = new THREE.MeshBasicMaterial({
        color: [0x474f59, 0x8c6542, 0xf2c894][i],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );

      meshes.push(mesh);
      scene.add(mesh);
    });

    // Create flowing waves
    const waveGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: 0xf2c894,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 4;
    waveMesh.position.z = -50;
    scene.add(waveMesh);

    camera.position.z = 50;

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Rotate particles
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;

      // Animate geometric shapes
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.01 * (i + 1);
        mesh.rotation.y += 0.015 * (i + 1);
        mesh.position.y += Math.sin(time + i) * 0.1;
      });

      // Animate wave vertices
      const positions = waveGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] =
          Math.sin(x * 0.1 + time * 2) * 3 + Math.cos(y * 0.1 + time) * 2;
      }
      waveGeometry.attributes.position.needsUpdate = true;

      // Camera movement based on mouse
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(135deg, #474F59 0%, #0D0D0D 100%)",
      }}
    />
  );
};

// Icon components (simplified SVG versions)
const PersonIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

const SpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.21-.72-4.24-1.93-5.9z" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9 1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.37-.37-.59-.88-.59-1.44 0-1.13.91-2.05 2.05-2.05h2.37C20.15 12.5 22 10.65 22 8.5 22 5.42 17.58 3 12 3z" />
  </svg>
);

const PsychologyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 8.57a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86z" />
    <path d="M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2a.5.5 0 0 0 .4.8h3.5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.24-.04-.47-.1-.7L18.48 9c.84-.58 1.37-1.54 1.37-2.58 0-1.81-1.55-3.26-3.48-2.83C15.15 3.22 14.15 3 13 3z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "32px 16px",
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
  };

  const glassCardStyle = {
    padding: "48px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
  };

  const avatarStyle = {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    margin: "0 auto 2px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.9)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: "8px",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(45deg, #fff, #e3f2fd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const subtitleStyle = {
    fontSize: "1.25rem",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: "32px",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  };

  const sectionTitleStyle = {
    fontSize: "1.5rem",
    color: "white",
    fontWeight: "500",
    marginBottom: "16px",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const skillItemStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  };

  const iconButtonStyle = {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "12px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    margin: "0 8px",
  };

  return (
    <>
      <WebGLBackground />
      <div style={containerStyle}>
        <div
          style={glassCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 35px 70px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                ...avatarStyle,
                overflow: "hidden",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0, 0, 0, 0.2)";
              }}
            >
              <img
                src="profile.png"
                alt="Jerome R. Esteban"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <h1 style={titleStyle}>Jerome R. Esteban</h1>
            <p style={subtitleStyle}>Full Stack Developer</p>
          </div>
          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              margin: "32px 0",
              border: "none",
            }}
          />

          {/* Content Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {/* Tech Stack */}
            <div>
              <h3 style={sectionTitleStyle}>
                <CodeIcon /> Tech Stack
              </h3>
              <div>
                <div style={skillItemStyle}>
                  <div style={{ color: "#4fc3f7", flexShrink: 0 }}>
                    <SpeedIcon />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "white",
                        fontWeight: "500",
                        margin: "0 0 4px 0",
                      }}
                    >
                      React & Next.js
                    </h4>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0,
                        fontSize: "14px",
                        lineHeight: 1.4,
                      }}
                    >
                      Building scalable, performant web applications with React
                      ecosystem
                    </p>
                  </div>
                </div>
                <div style={skillItemStyle}>
                  <div style={{ color: "#81c784", flexShrink: 0 }}>
                    <PaletteIcon />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "white",
                        fontWeight: "500",
                        margin: "0 0 4px 0",
                      }}
                    >
                      System Architecture
                    </h4>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0,
                        fontSize: "14px",
                        lineHeight: 1.4,
                      }}
                    >
                      Outlining components and structure that aligns with
                      business goals
                    </p>
                  </div>
                </div>
                <div style={skillItemStyle}>
                  <div style={{ color: "#ffb74d", flexShrink: 0 }}>
                    <PsychologyIcon />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "white",
                        fontWeight: "500",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Backend Development
                    </h4>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0,
                        fontSize: "14px",
                        lineHeight: 1.4,
                      }}
                    >
                      Designing robust APIs and database architectures for
                      scalable applications
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div>
              <h3 style={sectionTitleStyle}>About Me</h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.7,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  marginBottom: "16px",
                }}
              >
                An aspiring web developer passionate about exploring new
                technologies, experimenting with fresh ideas, and turning
                creative concepts into functional, user-friendly experiences.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.7,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  margin: 0,
                }}
              >
                I love coding with a hot coffee, jamming to lo-fi beats while
                chasing that 'aha'! moment, and tinkering with new stacks just
                to see what's possible. Always down for late-night hack sessions
                and brainstorming the next big idea. - says ChatGPT
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              margin: "32px 0",
              border: "none",
            }}
          />

          {/* Social Links */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                ...sectionTitleStyle,
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              Find Me Online
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <a
                href="https://github.com/jrmstbn"
                target="_blank"
                rel="noopener noreferrer"
                style={iconButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/jerome-esteban"
                target="_blank"
                rel="noopener noreferrer"
                style={iconButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:jersmurfing@gmail.com"
                style={iconButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <EmailIcon />
              </a>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                margin: 0,
              }}
            >
              © 2025 Jerome Esteban. Built with ❤️ using React and Three.js
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
