import React, { useState, useEffect } from 'react';
import { ReactComponent as Previous } from 'src/assets/previous.svg';
import { ReactComponent as Next } from 'src/assets/next.svg';
import styled from 'styled-components';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
	const [pageNumbers, setPageNumbers] = useState([]);

	const pageCount = () => {
		if (totalPosts) {
			let pageNumberTemp = [];

			for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
				pageNumberTemp.push(i);
			}
			if (pageNumberTemp.length > 10) {
				if (currentPage < 6) setPageNumbers(pageNumberTemp.slice(0, 10));
				else if (pageNumberTemp[currentPage - 5] && pageNumberTemp[currentPage + 5])
					setPageNumbers(pageNumberTemp.slice(currentPage - 5, currentPage + 5));
				else if (!pageNumberTemp[currentPage + 5]) setPageNumbers(pageNumberTemp.slice(-10));
			} else setPageNumbers(pageNumberTemp);
		}
	};

	const movePage = (num) => {
		if (num !== currentPage) {
			window.scrollTo(0, 0);
			paginate(num);
		}
	};

	useEffect(() => {
		pageCount();
	}, [totalPosts, currentPage]);

	return (
		<PaginationNav className="center">
			{currentPage > 0 && (
				<PaginationBtn className="center" onClick={() => movePage(currentPage - 1)}>
					<Previous fill="black" />
				</PaginationBtn>
			)}
			<ul className="center">
				{pageNumbers.map((number) => (
					<PaginationLi key={number} currentPage={currentPage + 1 === number}>
						<div onClick={() => movePage(number - 1)}>{number}</div>
					</PaginationLi>
				))}
			</ul>
			{currentPage + 1 < totalPosts / 10 && (
				<PaginationBtn className="center" onClick={() => movePage(currentPage + 1)}>
					<Next />
				</PaginationBtn>
			)}
		</PaginationNav>
	);
};

export default Pagination;

const PaginationNav = styled.nav`
	display: flex;
	ul {
		display: flex;
	}
`;

const PaginationLi = styled.li`
	cursor: pointer;
	margin: 0 12px;
	padding-bottom: 1px;
	list-style: none;
	line-height: 14px;
	font-size: var(--font-size-14);
	color: ${(props) => (props.currentPage ? 'var(--color-orange-point)' : 'black')};
`;

const PaginationBtn = styled.button`
	width: 28px;
	height: 28px;
	cursor: pointer;
	border: 1px solid var(--color-gray-button);
	background: white;
	border-radius: 4px;
	&:hover {
		background: var(--color-white-hover);
	}
`;
