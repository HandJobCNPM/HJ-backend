module.exports = {
    options: () => ({
        audience: 'hjobuser',
        issuer: 'hjobserver',
        algorithm: 'HS256',
        expiresIn: '1h'
    })
};