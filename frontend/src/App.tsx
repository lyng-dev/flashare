import React, { useState } from 'react'
import { Header } from './components/Header/index'
import { Footer } from './components/Footer/index'
import './App.scss'
import { CreateSecret } from './components/CreateSecret'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { SecretCreated } from './components/SecretCreated'
import { SecretDestroy } from './components/SecretDestroy'
import { ConsumeSecret } from './components/ConsumeSecret'
import { Spinner } from 'react-bootstrap'
import { Security } from './components/Security'

function App() {
    const [showSpinner, setShowSpinner] = useState(false)

    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path="/secret/owner/destroy/:keyName" element={<SecretDestroy showSpinner={setShowSpinner} />}>
                        
                    </Route>
                    <Route path="/secret/owner/:keyName" element={<SecretCreated />}>
                        
                    </Route>
                    <Route path="/secret/:keyName" element={<ConsumeSecret showSpinner={setShowSpinner} />}>
                        
                    </Route>
                    <Route path="/security" element={<Security />}>
                        
                    </Route>
                    <Route path="/" element={<CreateSecret showSpinner={setShowSpinner} />}>
                        
                    </Route>
                </Routes>
            </Router>
            <Spinner
                style={{ position: 'fixed', top: '50%', left: '50%' }}
                animation="border"
                role="status"
                hidden={!showSpinner}
            />
            <Footer />
        </div>
    )
}

export default App
