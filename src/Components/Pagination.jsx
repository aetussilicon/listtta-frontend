import { useNavigate } from 'react-router-dom';
import '../Styles/PaginationStyle.css';

export default function Pagination({ currentPage, totalPages }) {
    const navigate = useNavigate();

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        pages.push(1);

        if (currentPage > maxPagesToShow) {
            pages.push('...');
        }

        const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2));

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - Math.floor(maxPagesToShow / 2)) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className='pagination'>
            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={index} className="pagination-ellipsis">...</span>
                ) : (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => navigate(`/search/${page}`)}
                    >
                        {page}
                    </button>
                )
            ))}
        </div>
    );
}