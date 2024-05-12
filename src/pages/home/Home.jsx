import Banner from '../../components/banner/Banner';
import NewsLetter from '../newsletter/NewsLetter';
import RecentBlogs from '../recent-blogs/RecentBlogs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;