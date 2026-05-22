import React, { useState } from 'react'
import ControlPanel from '../components/ControlPanel'
import PageHeader from '../components/PageHeader'

export default function Controls(){
  const [isAuto, setIsAuto] = useState(true)

  return (
    <section className="space-y-6">
      <PageHeader
        label="Device Control"
        title="Device Control Center"
        subtitle="Toggle devices, adjust setpoints, and schedule actions."
      />

      <ControlPanel isAuto={isAuto} setIsAuto={setIsAuto} />
    </section>
  )
}
