import React from 'react';
import { Container } from 'react-bootstrap';
export default function ErrorFallback({error}: {error: Error}) {
    return (
      <Container style={{ width: '90%' }}>
      <div className="alert alert-dismissible alert-danger mt-1">
         <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        <strong><h1>Something went wrong:</h1></strong>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
      </Container>
    )
  }
