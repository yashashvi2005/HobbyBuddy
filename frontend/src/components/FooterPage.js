import { Link } from "react-router-dom";

function FooterPage (){
        const primary = '#a259ff';      // Main purple color
    const secondary = '#ff66c4';    // Highlight pink color

    return(
        <>   
            <footer style={{ backgroundColor: primary }} className="text-white text-center mt-5 border-top">
                <div className="p-4">
                    © 2025 <strong>Hobby Buddy</strong> | Created with ❤️ by <span style={{ color: secondary }}>Yashashvi Jain</span>
                    <br />
                    <small>
                        Follow us on:
                        <Link to= "https://www.instagram.com/hobbyindiaofficial/?hl=en" className="text-white text-decoration-none mx-1">Instagram</Link>|
                        <Link to="https://www.facebook.com/hobbyindia.store" className="text-white text-decoration-none mx-1">Facebook</Link>|
                        <Link to="https://www.youtube.com/@hobbyindia2709" className="text-white text-decoration-none mx-1">Youtube</Link>
                    </small>
                </div>
            </footer>
        </>
    )
}
export default FooterPage ; 