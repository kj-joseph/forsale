import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid2";

import Images from "@/components/Images";
import JerseyDetails from "@/components/JerseyDetails";
import { SiteTheme } from "@/components/SiteTheme";

import { getJerseyList } from "@/services/itemService";

import "@/style/main.scss";

const ItemList = (props) => {

	const [currentDialog, setCurrentDialog] = useState(null);
	const [zoomedImage, setZoomedImage] = useState({});

	const [jerseyList, _setJerseyList] = useState([]);

	const jerseyListRef = useRef(jerseyList);
	const setJerseyList = (data) => {
		jerseyListRef.current = data;
		_setJerseyList(data);
	}

	const { itemId } = useParams();
	let navigate = useNavigate();

	useEffect(() => {
		openDialog("loading");
		Promise.all([
			loadJerseyList(),
		])
			.then((loadedJerseyList) => {
				closeDialog();
			})
			.catch((error) => {
				console.error(error);
				closeDialog();
			});

	}, []);

	const loadJerseyList = async () => {

		getJerseyList()
			.then((loadedJerseyList) => {
				setJerseyList(loadedJerseyList);
			})
			.catch((error) => {
				console.error(error);
				openSnackbar("Error getting tier list from sheets");
			});

	}

	const getSingleJersey = id => {
		const jerseyFilter = jerseyListRef.current.filter(jersey => jersey.id === id);
		if (jerseyFilter.length === 1) {
			return jerseyFilter[0];
		} else {
			return {};
		}
	}

	const openImageView = (imageName) => {
		setZoomedImage(imageName);
		openDialog("image");
	}

	const openDialog = (dialog) => {
		setCurrentDialog(dialog);
	}

	const closeDialog = (event, reason) => {
		setCurrentDialog(null);
		setZoomedImage({});
	}

	return (

		<SiteTheme>

				<Dialog
				open={currentDialog === "loading"}
				onClose={closeDialog}
			>
				<DialogContent>
					<p>Loading...</p>
				</DialogContent>
			</Dialog>

			{jerseyListRef.current.length ?

				<Grid container size={12}>

					<Grid size={12}>

						{itemId ?

							<Grid size={12}>

								<Grid size={12} padding={2}>
									<Button
										variant="contained"
										onClick={() => navigate("/jerseys")}
									>
										Back to jersey list
									</Button>
								</Grid>

								<Grid size={12} container padding={2}>

									<JerseyDetails
										jersey={getSingleJersey(itemId)}
										id={itemId}
										openImageView={openImageView}
									/>

								</Grid>

							</Grid>

						:

							<>

								<Grid size={12} padding={2}>
									{/* <Button
										variant="contained"
										onClick={() => navigate("/scarves")}
									>
										Go to Scarves
									</Button> */}
								</Grid>

								<Grid size={12} padding={2}>

									<Grid container size={12} justifyContent="center">
										<h1>Jerseys for sale</h1>
									</Grid>

									<Grid container size={12} justifyContent={"space-around"}>

										{jerseyListRef.current
											.filter(jersey => !jersey.sold)
											.sort((a, b) => a.team < b.team ? -1 : a.team > b.team ? 1 :
												a.season < b.season ? -1 : a.season > b.season ? 1 : 0)
											.map((jersey, index) =>
												<Grid key={index} container size={{xs: 12, md: 5}}
													justifyContent={"space-between"}
													padding={2} border={2} margin={2}
												>

													<Grid size={7} >
														<JerseyDetails jersey={jersey} id={itemId} isListItem />
													</Grid>

													<Grid size={4} justifyItems="end">
														<Images
															className="thumbnails"
															id={jersey.id}
															show={1}
														/>

														<Button
															variant="contained"
															onClick={() => navigate(`/jerseys/${jersey.id}`)}
														>
															More details
														</Button>
													</Grid>

												</Grid>
											)}

									</Grid>

								</Grid>

							</>

						}

					</Grid>

				</Grid>

			: null }

		</SiteTheme>


	)

}

export default ItemList;
