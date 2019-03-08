import { HttpHeaders } from '@angular/common/http';

export const token = () => {
    const state = JSON.parse(localStorage.getItem('auth'));

    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.userState.access_token
    });
}