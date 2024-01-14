import { Link } from 'react-router-dom';
import logo from '../assets/feather.png';
import AnimationWrapper from '../common/AnimationWrapper';
import defaultBanner from '../assets/blog banner.png';
import { uploadImage } from '../common/AWS';
import { Toaster, toast } from 'react-hot-toast';
import { useContext } from 'react';
import { EditorContext } from '../pages/Editor';

const BlogEditor = () => {
    const {
        blog,
        blog: { title, banner, content, tags, des, author },
        setBlog,
    } = useContext(EditorContext);

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading('Uploading...');
            uploadImage(img)
                .then((url) => {
                    if (url) {
                        toast.dismiss(loadingToast);
                        toast.success('Uploaded ');

                        setBlog({ ...blog, banner: url });
                    }
                })
                .catch((err) => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                });
        }
    };

    const handleTitleKeydown = (e) => {
        if (e.keyCode === 13) {
            // Enter key
            e.preventDefault();
        }
    };

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';

        setBlog({ ...blog, title: input.value });
    };

    const handleError = (e) => {
        let img = e.target;
        img.src = defaultBanner;
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} className="flex-none w-14 h-12" alt="" />
                </Link>

                <p className="max-md:hidden text-black line-clamp-1 w-full">{title.length ? title : 'New Blog'}</p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2">Publish</button>
                    <button className="btn-light py-2">Save Draft</button>
                </div>
            </nav>
            <Toaster />
            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 mt-8 border-gray">
                            <label htmlFor="uploadBanner" className="cursor-pointer">
                                <img src={banner} alt="" onError={handleError} />
                                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload} />
                            </label>
                        </div>

                        <textarea placeholder="Blog Title" className="text-4xl font-medium outline-none resize-none w-full h-20 mt-10 leading-tight placeholder:opacity-50" onKeyDown={handleTitleKeydown} onChange={handleTitleChange}></textarea>

                        <hr className="w-full my-5 opacity-20" />
                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default BlogEditor;
