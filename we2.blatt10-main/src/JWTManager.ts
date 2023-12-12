import jwtDecode, { JwtPayload } from 'jwt-decode';

export function retrieveJWT(): string | null {
    return localStorage.getItem("jwt");
}

export function storeJWT(jwt: string) {
    localStorage.setItem("jwt", jwt);
}

export function removeJWT() {
    localStorage.removeItem("jwt");
}

export function getLoginInfoFromJWT(jwt: string | null): { userId: string } | null {
    if (!jwt) {
        return null;
    }
    const payload: JwtPayload = jwtDecode(jwt);
    const userId = payload.sub;
    if (!userId) {
        return null;
    }
    return { userId };
}