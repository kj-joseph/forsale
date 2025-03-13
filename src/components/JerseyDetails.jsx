import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Images from "@/components/Images";

import displayDecimal from "@/utils/displayDecimal";

const JerseyDetails = ({jersey, id, isListItem}) => {

	return (

		jersey && jersey.id ?

			<>
				{!isListItem ?
					<Grid size={12}>
						<h2>Jersey Details

						{jersey.ebayLink ?

							<>
								<a href={jersey.ebayLink} target="_blank" className="link">
									<Button
										variant="contained"
										color="info"
									>
										View on eBay
									</Button>

								</a>
							</>

						: null}

						</h2>

					</Grid>
				: null}

				<TableContainer className="jerseyDetailTable">
					<Table border={1}>
						<TableBody>

							<TableRow>
								<TableCell sx={{width: 125}}><strong>ID</strong></TableCell>
								<TableCell>{jersey.id}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Price </strong></TableCell>
								<TableCell>{jersey.price ? `$${displayDecimal(jersey.price, 0)}` : ""} (make offer)</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Sport</strong></TableCell>
								<TableCell>{jersey.sport}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Team</strong></TableCell>
								<TableCell>{jersey.team}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>League</strong></TableCell>
								<TableCell>{jersey.league}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Season(s)</strong></TableCell>
								<TableCell>{jersey.season}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Type</strong></TableCell>
								<TableCell>{jersey.type}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Marked Size</strong></TableCell>
								<TableCell>{jersey.size}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><strong>Manufacturer</strong></TableCell>
								<TableCell>{jersey.manufacturer}</TableCell>
							</TableRow>
							{jersey.number ?
								<TableRow>
									<TableCell><strong>Number</strong></TableCell>
									<TableCell>{jersey.number}</TableCell>
								</TableRow>
							: null }
							{jersey.name ?
								<TableRow>
									<TableCell><strong>Name</strong></TableCell>
									<TableCell>{jersey.name}</TableCell>
								</TableRow>
							: null }
							{!isListItem ?
								<>
									<TableRow>
										<TableCell><strong>Notes</strong></TableCell>
										<TableCell>{jersey.notes}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><strong>Photos</strong><br/>(Click to enlarge in new window)</TableCell>
										<TableCell>
											<Images
												hasLink
												className="details"
												id={jersey.id}
												show={jersey.photos}
												type="jerseys"
											/>
										</TableCell>
									</TableRow>
								</>
							: null }
						</TableBody>

					</Table>
				</TableContainer>

			</>

		:

			<p>Jersey <strong>{id}</strong> not found</p>


	)

}

export default JerseyDetails;
