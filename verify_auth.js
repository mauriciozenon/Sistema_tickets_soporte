const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

async function verifyAuth() {
    try {
        // 1. Register a new user (Admin)
        const uniqueId = Date.now();
        const adminUser = {
            nombre: `Admin Test ${uniqueId}`,
            email: `admin${uniqueId}@test.com`,
            password: 'password123',
            rol: 'administrador'
        };

        console.log('1. Registering Admin User...');
        const registerRes = await axios.post(`${API_URL}/usuarios`, adminUser);
        console.log('   Success:', registerRes.status === 201);

        // 2. Login
        console.log('2. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: adminUser.email,
            password: adminUser.password
        });
        const token = loginRes.data.token;
        console.log('   Success:', !!token);

        // 3. Access Protected Route (Profile)
        console.log('3. Accessing Profile...');
        const profileRes = await axios.get(`${API_URL}/auth/perfil`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Success:', profileRes.data.email === adminUser.email);

        console.log('\nVerification Complete: All tests passed!');

    } catch (error) {
        console.error('\nVerification Failed:', error.response ? error.response.data : error.message);
    }
}

// verifyAuth();
