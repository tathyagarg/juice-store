import { PUBLIC_SLACK_CLIENT_ID } from '$env/static/public';
import { SLACK_CLIENT_SECRET } from '$env/static/private';

export async function POST({ request }) {
    const { code } = await request.json();
    
    const res = await fetch('https://slack.com/api/openid.connect.token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code,
            client_id: PUBLIC_SLACK_CLIENT_ID,
            client_secret: SLACK_CLIENT_SECRET,
            redirect_uri: 'https://localhost:5173/callback',
        }),
    });

    const json = await res.json();

    if (!json.ok) {
        let status = 500;
        
        switch (json.error) {
            default: {
                status = 500;
            }
        }

        return Response.json(json, { status });
    }

    const { access_token, id_token } = json;

    return Response.json({
        access_token,
        id_token,
    })
}