import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const token = searchParams.get('token');
            if (!token) return;

            try {
                const res = await axios.get(`http://localhost:4000/auth/verify-email?token=${token}`, {
                    withCredentials: true,
                });

                localStorage.setItem('accessToken', res.data.accessToken);
                navigate('/login'); // або куди хочеш
            } catch (e) {
                console.error(e);
                // navigate('/error'); // або показати повідомлення
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Перевірка електронної пошти...</h2>
        </div>
    );
};

export {VerifyEmailPage};
