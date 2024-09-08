// List of origins that are allowed to make rquests to the server
const allowedOrigins = [`http://${process.env.FRONTEND_LOCAL_IP}:${process.env.FRONTEND_LOCAL_PORT}`,
                        `https://$${process.env.FRONTEND_LOCAL_IP}:${process.env.FRONTEND_LOCAL_PORT}`,
                        `http://${process.env.FRONTEND_PUBLIC_DOMAIN}`,
                        `https://${process.env.FRONTEND_PUBLIC_DOMAIN}`,
]

module.exports = allowedOrigins;