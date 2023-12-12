import React from "react";
import { Button, Alert, Modal, Form } from "react-bootstrap";
import { login } from "../backend/shopperapi";
import { getLoginInfoFromJWT, storeJWT } from "../JWTManager";
import { useLoginContext } from "../LoginContext";

export type LoginDialogProps = {
  show: boolean;
  close: () => void
}

export default function LoginDialog({ show, close }: LoginDialogProps) {
  const { loginInfo, setLoginInfo } = useLoginContext();
  const [data, setData] = React.useState({ email: "", password: "" });
  const [msg, setMsg] = React.useState("");

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const jwt = await login(data.email, data.password);
      if (jwt) {
        storeJWT(jwt);
        const logInfo = getLoginInfoFromJWT(jwt);
        setLoginInfo(logInfo);
      } else {
        setMsg("Login failed")
      }
      close();
      window.location.reload();
    } catch (error) {
      setMsg(String(error));
    }
  }

  return (
    <Modal show={show} onHide={close} backdrop="static">
      <Form>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="emailInput">E-Mail</Form.Label>
            <Form.Control type="email" id="emailInput" placeholder="name@beispiel.de" name="email" value={data.email} onChange={update} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="passwordInput">Passwort</Form.Label>
            <Form.Control type="password" id="passwordInput" placeholder="Passwort" name="password" value={data.password} onChange={update} />
            {msg && (
              <Alert variant="danger" className="mt-3">
                {msg}
              </Alert>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button variant="primary" onClick={onLogin}>OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}