import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

	const [jerseyList, _setJerseyList] = useState([]);

	const jerseyListRef = useRef(jerseyList);
	const setJerseyList = (data) => {
		jerseyListRef.current = data;
		_setJerseyList(data);
	}

	const { itemId } = useParams();

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

	const openDialog = (dialog) => {
		setCurrentDialog(dialog);
	}

	const closeDialog = (event, reason) => {
		setCurrentDialog(null);
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
									<Link to="/jerseys">
										<Button variant="contained">
											Back to jersey list
										</Button>
									</Link>
								</Grid>

								<Grid size={12} container padding={2}>

									<JerseyDetails
										id={itemId}
										jersey={getSingleJersey(itemId)}
									/>

								</Grid>

							</Grid>

						:

							<>

								<Grid size={12} padding={2}>

									<Link to="/scarves">
										<Button variant="contained">
											Go to Scarves
										</Button>
									</Link>

								</Grid>

								<Grid size={12} padding={0}>

									<Grid container size={12} justifyContent="center">
										<h1>Jerseys for sale</h1>
									</Grid>

									<Grid container size={12} justifyContent="center" marginTop={-2}>
										<p>(More coming soon)</p>
									</Grid>

									<Grid container size={12} justifyContent={"space-around"}>

										{jerseyListRef.current
											.filter(jersey => ["paid", "postage", "shipped", "reserved"].indexOf(jersey.status) === -1)
											.sort((a, b) => a.team < b.team ? -1 : a.team > b.team ? 1 :
												a.season < b.season ? -1 : a.season > b.season ? 1 : 0)
											.map((jersey, index) =>
												<Grid key={index} container size={{xs: 12, lg: 5}}
													justifyContent={"space-between"}
													padding={2} border={2} margin={2}
												>

													<Grid size={{xs: 12, lg: 7}} marginTop={-2}>
														<JerseyDetails
															isListItem
															id={itemId}
															jersey={jersey}
														/>
													</Grid>

													<Grid size={{xs: 12, lg: 4}}
														justifyItems={{xs: "center", lg: "end"}}
														paddingTop={{xs: 2, lg: 0}}
													>
														<Link to={`/jerseys/${jersey.id}`}>
															<Button variant="contained">
																More details
															</Button>
														</Link>

														<Images
															hasLink
															className="thumbnails"
															id={jersey.id}
															show={1}
															type="jerseys"
														/>

														<div><br/>(Click photo to enlarge in new window)</div>

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
