import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

/* ── Data generation ── */

function generateCluster(
  cx: number, cy: number, cz: number,
  count: number,
  spread: number,
  color: [number, number, number]
): { positions: Float32Array; colors: Float32Array } {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = cx + (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = cy + (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = cz + (Math.random() - 0.5) * spread
    const t = Math.random()
    colors[i * 3]     = color[0] * (0.6 + t * 0.4)
    colors[i * 3 + 1] = color[1] * (0.6 + t * 0.4)
    colors[i * 3 + 2] = color[2] * (0.6 + t * 0.4)
  }
  return { positions, colors }
}

function generateSurface(count: number): { positions: Float32Array; colors: Float32Array } {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = (Math.random() - 0.5) * 2.5
    const v = (Math.random() - 0.5) * 2.5
    const h = Math.sin(u * 2) * Math.cos(v * 1.5) * 0.8 + Math.random() * 0.1
    positions[i * 3]     = u
    positions[i * 3 + 1] = h + 0.5
    positions[i * 3 + 2] = v
    // height-based color: cyan → yellow
    const t = (h + 0.8) / 1.6
    colors[i * 3]     = t
    colors[i * 3 + 1] = 0.8 + t * 0.2
    colors[i * 3 + 2] = 1 - t * 0.8
  }
  return { positions, colors }
}

/* ── Point cloud mesh ── */

interface PointCloudProps {
  positions: Float32Array
  colors: Float32Array
  size?: number
}

function PointCloud({ positions, colors, size = 0.018 }: PointCloudProps) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  return (
    <points geometry={geo}>
      <pointsMaterial
        vertexColors
        size={size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Spiral ribbon ── */

function SpiralRibbon({ color, y = 0, radius = 0.35, turns = 3 }: {
  color: string; y?: number; radius?: number; turns?: number
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2 * turns
      pts.push(new THREE.Vector3(
        Math.cos(t) * radius,
        y + (i / 120 - 0.5) * 0.6,
        Math.sin(t) * radius
      ))
    }
    return pts
  }, [y, radius, turns])

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 })
    return new THREE.Line(geo, mat)
  }, [points, color])

  return <primitive object={lineObj} />
}

/* ── Axis labels ── */

function AxisLabels() {
  return (
    <group>
      <Text position={[0, -1.35, 1.6]}  fontSize={0.08} color="#7ec8e3" anchorX="center">South→North</Text>
      <Text position={[1.7, -1.35, 0]}  fontSize={0.08} color="#7ec8e3" anchorX="center" rotation={[0, Math.PI / 2, 0]}>West→East</Text>
      <Text position={[-1.6, 0, 0]}     fontSize={0.08} color="#7ec8e3" anchorX="center" rotation={[0, Math.PI / 2, 0]}>Elevation</Text>
      {([-1, -0.28, 0.36, 1.09] as number[]).map((v) => (
        <Text key={v} position={[-1.55, v, 0]} fontSize={0.065} color="#ffffff88" anchorX="right">
          {v.toFixed(2)}
        </Text>
      ))}
    </group>
  )
}

/* ── Scene ── */

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  const surface = useMemo(() => generateSurface(3200), [])

  const pink = useMemo(() =>
    generateCluster(0.3, 0.1, 0.2, 600, 0.55, [1, 0.3, 0.7]), [])

  const orange = useMemo(() =>
    generateCluster(0.1, -0.2, -0.1, 400, 0.35, [1, 0.55, 0.1]), [])

  const cyan = useMemo(() =>
    generateCluster(-0.3, 0.4, -0.3, 500, 0.4, [0.2, 0.9, 1]), [])

  const axisLines = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#ffffff33" })
    const pairs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-1.4, -1.2, 0), new THREE.Vector3(1.4, -1.2, 0)],
      [new THREE.Vector3(0, -1.2, -1.4), new THREE.Vector3(0, -1.2, 1.4)],
      [new THREE.Vector3(-1.4, -1.2, 0), new THREE.Vector3(-1.4, 1.2, 0)],
    ]
    return pairs.map(([a, b]) => new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), mat))
  }, [])

  return (
    <group ref={groupRef}>
      {/* Main surface point cloud */}
      <PointCloud positions={surface.positions} colors={surface.colors} size={0.016} />

      {/* Clusters */}
      <PointCloud positions={pink.positions}   colors={pink.colors}   size={0.022} />
      <PointCloud positions={orange.positions} colors={orange.colors} size={0.022} />
      <PointCloud positions={cyan.positions}   colors={cyan.colors}   size={0.018} />

      {/* Spiral ribbons */}
      <SpiralRibbon color="#ff60c0" y={0.1}  radius={0.32} turns={2.5} />
      <SpiralRibbon color="#ff9030" y={-0.2} radius={0.22} turns={2}   />

      {/* Axis lines */}
      {axisLines.map((obj, i) => <primitive key={i} object={obj} />)}

      <AxisLabels />
    </group>
  )
}

/* ── Public component ── */

interface PointCloudChartProps {
  className?: string
}

export function PointCloudChart({ className }: PointCloudChartProps) {
  return (
    <div className={cn("relative w-full h-full min-h-[400px]overflow-hidden ", className)}>
      {/* ambient bloom */}
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_40%,#1a4a7a33_0%,transparent_65%)]" /> */}
      <Canvas
        camera={{ position: [2.4, 1.6, 2.4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        // style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <Scene />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={6}
          autoRotate={false}
        />
      </Canvas>

    </div>
  )
}
