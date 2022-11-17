import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Not Found";

        return () => { }

    }, []);

    return (
        <div className="app__flex" style={{
            width: "100%",
            height: "100vh",
        }}>
            <div>Page Not Found!</div>
            <Button
                variant="text"
                color='secondary'
                sx={{ marginTop: "4px" }}
                onClick={() => navigate("/")}
            >
                Go to Home
            </Button>
        </div>
    )
}

export default NotFoundPage;