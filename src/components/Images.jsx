const ImageThumbnails = ({className, id, show, total, hasLink}) => {

	return (

		<div className={className}>
			{[...Array(show || total)].map((e, index) =>
				<div className="image" key={index}>
					{hasLink ?
						<a
							target="_blank"
							href={`/images/jerseys/${id}-${index + 1}.jpg`}
						>
							<img
								src={`/images/jerseys/${id}-${index + 1}.jpg`}
								alt=""
							/>
						</a>
					:
						<img
							src={`/images/jerseys/${id}-${index + 1}.jpg`}
							alt=""
						/>
					}
				</div>
			)}
		</div>

	);

}




export default ImageThumbnails;
