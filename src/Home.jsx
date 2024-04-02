import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'

import { useState, useEffect } from 'react'

export function Home () {
  const store = localStorage.getItem('controls')

  const getData = () => {
    if (store) {
      return JSON.parse(store)
    } else {
      return []
    }
  }

  const [data, setData] = useState(getData())
  const [indexData, setIndexData] = useState(0)
  const [name, setName] = useState('')

  const [rCentral, setRCentral] = useState('')
  const [rVmax, setRVmax] = useState('')
  const [rExpo, setRExpo] = useState('')

  const [pCentral, setPCentral] = useState('')
  const [pVmax, setPVmax] = useState('')
  const [pExpo, setPExpo] = useState('')

  const [yCentral, setYCentral] = useState('')
  const [yVmax, setYVmax] = useState('')
  const [yExpo, setYExpo] = useState('')

  const cleanFields = () => {
    document.getElementById('input-roll1').value = ''
    document.getElementById('input-roll2').value = ''
    document.getElementById('input-roll3').value = ''

    document.getElementById('input-pitch1').value = ''
    document.getElementById('input-pitch2').value = ''
    document.getElementById('input-pitch3').value = ''

    document.getElementById('input-yaw1').value = ''
    document.getElementById('input-yaw2').value = ''
    document.getElementById('input-yaw3').value = ''

    document.getElementById('input-name').value = ''
  }

  const handleClick = (e) => {
    e.preventDefault()
    const value = indexData + 1
    setIndexData(value)

    const obj =
    {
      indexData,
      name,
      rCentral, rVmax, rExpo,
      pCentral, pVmax, pExpo,
      yCentral, yVmax, yExpo
    }

    if (rCentral > 800 | rVmax > 800 | rExpo > 800 |
        pCentral > 800 | pVmax > 800 | pExpo > 800 |
        yCentral > 800 | yVmax > 800 | yExpo > 800) {
      window.alert('No se permiten valores mayores a 800')
    } else {
      setData([...data, obj])
    }
    cleanFields()
  }

  const removeItem = (indexItem) => {
    if (window.confirm('¿Seguro quiere borrar la configuración?')) {
      const rmItem = data.filter((e, index) => {
        return indexItem !== index
      })
      setData(rmItem)
    }
  }

  useEffect(() => {
    localStorage.setItem('controls', JSON.stringify(data))
  }, [data])

  return (
    <main>
      <header>
        <h1>Dronify</h1>
      </header>
      <section>
        <div className='input-container'>
          <span>Ingrese los valores de configuración del mando</span>
          <label className='confi-title'>Roll:</label>
          <div className='field-info'>
            <Input id='input-roll1' type='number' placeholder='Sensibilidad central' onChange={(e) => setRCentral(e.target.value)} />
            <Input id='input-roll2' type='number' placeholder='Velocidad máxima' onChange={(e) => setRVmax(e.target.value)} />
            <Input id='input-roll3' type='number' placeholder='Exposición' onChange={(e) => setRExpo(e.target.value)} />
          </div>

          <label className='confi-title'>Pitch:</label>
          <div className='field-info'>
            <Input id='input-pitch1' type='number' placeholder='Sensibilidad central' onChange={(e) => setPCentral(e.target.value)} />
            <Input id='input-pitch2' type='number' placeholder='Velocidad máxima' onChange={(e) => setPVmax(e.target.value)} />
            <Input id='input-pitch3' type='number' placeholder='Exposición' onChange={(e) => setPExpo(e.target.value)} />
          </div>

          <label className='confi-title'>Yaw:</label>
          <div className='field-info'>
            <Input id='input-yaw1' type='number' placeholder='Sensibilidad central' onChange={(e) => setYCentral(e.target.value)} />
            <Input id='input-yaw2' type='number' placeholder='Velocidad máxima' onChange={(e) => setYVmax(e.target.value)} />
            <Input id='input-yaw3' type='number' placeholder='Exposición' onChange={(e) => setYExpo(e.target.value)} />
          </div>
          <Input id='input-name' type='text' className='name-field' placeholder='Escriba el nombre de la configuración' onChange={(e) => setName(e.target.value)} />
          <Button onClick={(e) => handleClick(e)}>Aceptar</Button>
        </div>
      </section>

      <section>
        <div className='accor-container'>
          <Accordion type='multiple'>
            {
              data.map((item, index) => (
                <AccordionItem key={item.indexData} value={`item-${index}`}>
                  <AccordionTrigger>{item.name}</AccordionTrigger>
                  <AccordionContent className='c1'>
                    <div className='data-container'>
                      <div className='we'>
                        <span className='data-title'>Roll</span>
                        <div className='field-info'>
                          <span>{item.rCentral}</span>
                          <span>{item.rVmax}</span>
                          <span>{item.rExpo}</span>
                        </div>
                      </div>

                      <div className='we'>
                        <span className='data-title'>Pitch</span>
                        <div className='field-info'>
                          <span>{item.pCentral}</span>
                          <span>{item.pVmax}</span>
                          <span>{item.pExpo}</span>
                        </div>
                      </div>

                      <div className='we'>
                        <span className='data-title'>Yaw</span>
                        <div className='field-info'>
                          <span>{item.yCentral}</span>
                          <span>{item.yVmax}</span>
                          <span>{item.yExpo}</span>
                        </div>
                      </div>
                      <div className='we'>
                        <Button onClick={() => removeItem(index)}>Borrar</Button>
                      </div>

                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        </div>
      </section>

    </main>
  )
}
