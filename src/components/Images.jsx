const ImageThumbnails = ({className, hasLink, id, show, type}) => {

	return (

		<div className={className}>
			{[...Array(show)].map((e, index) =>
				<div className="image" key={index}>
					{hasLink ?
						<a
							target="_blank"
							href={`/images/${type}/${id}-${index + 1}.jpg`}
						>
							<img
								src={`/images/${type}/${id}-${index + 1}.jpg`}
								alt=""
							/>
						</a>
					:
						<img
							src={`/images/${type}/${id}-${index + 1}.jpg`}
							alt=""
						/>
					}
				</div>
			)}
		</div>

	);

}




export default ImageThumbnails;
