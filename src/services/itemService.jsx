import { callGoogleSheets } from "@/services/googleSheetsService";

export const getJerseyList = async () =>

	new Promise((resolve, reject) => {

		callGoogleSheets("jerseys", {})
			.then((response) =>
				resolve(response
					.filter(jersey => !!jersey.id)
					.map(jersey => ({
						id: jersey.id,
						ebayLink: jersey.ebayLink,
						league: jersey.league,
						manufacturer: jersey.manufacturer,
						name: jersey.name,
						notes: jersey.notes,
						number: jersey.number,
						photos: Number(jersey.photos),
						price: jersey.price,
						season: jersey.season,
						size: jersey.size,
						sold: jersey.sold === "TRUE",
						sport: jersey.sport,
						team: jersey.team,
						type: jersey.type,
				})))
			)

			.catch((error) =>
				reject(error));

	});
