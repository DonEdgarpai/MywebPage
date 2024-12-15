"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Train, Leaf, BarChart2, Info } from 'lucide-react'

export default function Component() {
  interface SimulationResult {
    environmentalImprovement: string;
    efficiency: string;
    capacity: string;
    deforestationImpact: string;
    infrastructureCost: string;
    boyacaDeforestationCurrent: number;
    boyacaDeforestationProjected: number;
    cundinamarcaDeforestationCurrent: number;
    cundinamarcaDeforestationProjected: number;
    boyacaReforestationCurrent: number;
    boyacaReforestationProjected: number;
    cundinamarcaReforestationCurrent: number;
    cundinamarcaReforestationProjected: number;
  }  

  const [activeSection, setActiveSection] = useState('overview')
  const [selectedRoute, setSelectedRoute] = useState('')
  const [trainType, setTrainType] = useState('diesel')
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)

  const routes = [
    { id: '1', name: 'Bogotá - Belencito', distance: 262, type: 'Mixto', maxWeight: 1800 },
    { id: '2', name: 'Bogotá - Zipaquirá', distance: 53, type: 'Pasajeros', maxWeight: 500 },
    { id: '3', name: 'La Caro - Lenguazaque', distance: 110, type: 'Carga', maxWeight: 2000 },
  ]

  const deforestationRates = [
    { year: 2020, boyaca: 1100, cundinamarca: 1400 },
    { year: 2021, boyaca: 950, cundinamarca: 1300 },
    { year: 2022, boyaca: 900, cundinamarca: 1200 },
    { year: 2023, boyaca: 850, cundinamarca: 1100 },
    { year: 2024, boyaca: 800, cundinamarca: 1000 },
  ]

  const reforestationRates = [
    { year: 2020, boyaca: 350, cundinamarca: 450 },
    { year: 2021, boyaca: 400, cundinamarca: 500 },
    { year: 2022, boyaca: 450, cundinamarca: 550 },
    { year: 2023, boyaca: 500, cundinamarca: 600 },
    { year: 2024, boyaca: 550, cundinamarca: 650 },
  ]

  const runSimulation = () => {
    const selectedRouteData = routes.find(route => route.id === selectedRoute)
    if (!selectedRouteData) return

    let environmentalImprovement, efficiency, capacity, deforestationImpact, infrastructureCost

    switch (trainType) {
      case 'electric':
        environmentalImprovement = 0.8
        efficiency = 0.9
        capacity = 1.1
        deforestationImpact = 0.7
        infrastructureCost = selectedRouteData.distance * 5
        break
      case 'hydrogen':
        environmentalImprovement = 0.9
        efficiency = 0.85
        capacity = 1.05
        deforestationImpact = 0.8
        infrastructureCost = selectedRouteData.distance * 7
        break
      default: // diesel
        environmentalImprovement = 0.3
        efficiency = 0.7
        capacity = 1
        deforestationImpact = 0.9
        infrastructureCost = selectedRouteData.distance * 3
    }

    const currentDeforestation = deforestationRates[deforestationRates.length - 1]
    const currentReforestation = reforestationRates[reforestationRates.length - 1]

    const boyacaDeforestationReduction = Math.round(currentDeforestation.boyaca * (1 - deforestationImpact))
    const cundinamarcaDeforestationReduction = Math.round(currentDeforestation.cundinamarca * (1 - deforestationImpact))

    const boyacaReforestationIncrease = Math.round(currentReforestation.boyaca * (1 + environmentalImprovement))
    const cundinamarcaReforestationIncrease = Math.round(currentReforestation.cundinamarca * (1 + environmentalImprovement))

    setSimulationResult({
      environmentalImprovement: (environmentalImprovement * 100).toFixed(1),
      efficiency: (efficiency * 100).toFixed(1),
      capacity: (capacity * selectedRouteData.maxWeight).toFixed(0),
      deforestationImpact: (deforestationImpact * 100).toFixed(1),
      infrastructureCost: (infrastructureCost).toFixed(0),
      boyacaDeforestationCurrent: currentDeforestation.boyaca,
      boyacaDeforestationProjected: boyacaDeforestationReduction,
      cundinamarcaDeforestationCurrent: currentDeforestation.cundinamarca,
      cundinamarcaDeforestationProjected: cundinamarcaDeforestationReduction,
      boyacaReforestationCurrent: currentReforestation.boyaca,
      boyacaReforestationProjected: boyacaReforestationIncrease,
      cundinamarcaReforestationCurrent: currentReforestation.cundinamarca,
      cundinamarcaReforestationProjected: cundinamarcaReforestationIncrease,
    })
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>EcoRail: Transporte Sostenible para Boyacá y Cundinamarca</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">EcoRail es una iniciativa innovadora que busca revitalizar y expandir el sistema ferroviario en Boyacá y Cundinamarca, proporcionando un medio de transporte eficiente y sostenible para reducir la deforestación y promover la reforestación en estas regiones cruciales de Colombia.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Leaf className="mr-2" />
                      Beneficios Ambientales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside">
                      <li>Reducción de emisiones de CO2 en hasta un 70% comparado con el transporte por carretera</li>
                      <li>Disminución de la presión sobre los bosques al reducir la necesidad de nuevas carreteras</li>
                      <li>Promoción de corredores ecológicos a lo largo de las vías férreas</li>
                      <li>Contribución a las metas de reforestación de Colombia para 2030</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="mr-2" />
                      Impacto Económico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside">
                      <li>Mejora en la logística de transporte, reduciendo costos hasta en un 30%</li>
                      <li>Creación de más de 5,000 empleos verdes en la región</li>
                      <li>Impulso al turismo sostenible en Boyacá y Cundinamarca</li>
                      <li>Aumento proyectado del PIB regional en un 2% anual debido al proyecto</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )
      case 'information':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Información de Rutas y Tasas de Deforestación/Reforestación</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Rutas Ferroviarias</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Distancia (km)</TableHead>
                    <TableHead>Tipo de Transporte</TableHead>
                    <TableHead>Capacidad Máxima (ton)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.type}</TableCell>
                      <TableCell>{route.maxWeight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6 mb-2">Tasa de Deforestación Anual (hectáreas)</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Año</TableHead>
                    <TableHead>Boyacá</TableHead>
                    <TableHead>Cundinamarca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deforestationRates.map((rate) => (
                    <TableRow key={rate.year}>
                      <TableCell>{rate.year}</TableCell>
                      <TableCell>{rate.boyaca}</TableCell>
                      <TableCell>{rate.cundinamarca}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6 mb-2">Tasa de Reforestación Anual (hectáreas)</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Año</TableHead>
                    <TableHead>Boyacá</TableHead>
                    <TableHead>Cundinamarca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reforestationRates.map((rate) => (
                    <TableRow key={rate.year}>
                      <TableCell>{rate.year}</TableCell>
                      <TableCell>{rate.boyaca}</TableCell>
                      <TableCell>{rate.cundinamarca}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case 'simulation':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Simulación de Escenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Ruta:</label>
                  <Select onValueChange={setSelectedRoute}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una ruta" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>{route.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2">Tipo de Tren:</label>
                  <Select onValueChange={setTrainType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de tren" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Eléctrico</SelectItem>
                      <SelectItem value="hydrogen">Hidrógeno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={runSimulation}>Ejecutar Simulación</Button>
              {simulationResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Resultado de la Simulación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Impacto General</h3>
                    <ul className="list-disc list-inside mb-4">
                      <li>Mejora ambiental: {simulationResult.environmentalImprovement}%</li>
                      <li>Eficiencia: {simulationResult.efficiency}%</li>
                      <li>Capacidad: {simulationResult.capacity} toneladas</li>
                      <li>Impacto en deforestación: Reducción del {simulationResult.deforestationImpact}%</li>
                      <li>Costo estimado de infraestructura: {simulationResult.infrastructureCost} millones COP</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Comparación con Datos Actuales</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Métrica</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Proyectado</TableHead>
                          <TableHead>Mejora</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Deforestación Boyacá (ha/año)</TableCell>
                          <TableCell>{simulationResult.boyacaDeforestationCurrent}</TableCell>
                          <TableCell>{simulationResult.boyacaDeforestationProjected}</TableCell>
                          <TableCell>{simulationResult.boyacaDeforestationCurrent - simulationResult.boyacaDeforestationProjected}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Deforestación Cundinamarca (ha/año)</TableCell>
                          <TableCell>{simulationResult.cundinamarcaDeforestationCurrent}</TableCell>
                          <TableCell>{simulationResult.cundinamarcaDeforestationProjected}</TableCell>
                          <TableCell>{simulationResult.cundinamarcaDeforestationCurrent - simulationResult.cundinamarcaDeforestationProjected}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Reforestación Boyacá (ha/año)</TableCell>
                          <TableCell>{simulationResult.boyacaReforestationCurrent}</TableCell>
                          <TableCell>{simulationResult.boyacaReforestationProjected}</TableCell>
                          <TableCell>{simulationResult.boyacaReforestationProjected - simulationResult.boyacaReforestationCurrent}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Reforestación Cundinamarca (ha/año)</TableCell>
                          <TableCell>{simulationResult.cundinamarcaReforestationCurrent}</TableCell>
                          <TableCell>{simulationResult.cundinamarcaReforestationProjected}</TableCell>
                          <TableCell>{simulationResult.cundinamarcaReforestationProjected - simulationResult.cundinamarcaReforestationCurrent}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Cómo se Logrará la Reducción de Deforestación</h3>
                    <ul className="list-disc list-inside">
                      <li>Disminución del tráfico de camiones pesados en carreteras, reduciendo la necesidad de expansión vial</li>
                      <li>Implementación de corredores ecológicos a lo largo de las vías férreas</li>
                      <li>Uso de tecnologías de trenes más eficientes y menos contaminantes</li>
                      <li>Inversión en programas de reforestación en áreas adyacentes a las rutas ferroviarias</li>
                      <li>Promoción del uso del tren como alternativa sostenible para el transporte de carga y pasajeros</li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Train className="mr-2" /> EcoRail Boyacá y Cundinamarca
          </h1>
          <nav className="flex gap-4">
            <Button variant="ghost" onClick={() => setActiveSection('overview')}>Visión General</Button>
            <Button variant="ghost" onClick={() => setActiveSection('information')}>Información</Button>
            <Button variant="ghost" onClick={() => setActiveSection('simulation')}>Simulación</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4 flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-green-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 EcoRail Boyacá y Cundinamarca. Comprometidos con el desarrollo sostenible y la conservación de nuestros bosques.</p>
        </div>
      </footer>
    </div>
  )
}