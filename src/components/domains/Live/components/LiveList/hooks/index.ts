import useSWR from "swr";

export type Live = {
	id: string;
	title: string;
	thumbnail: string;
	date: string;
	isLive: boolean;
	isMemberShip: boolean;
};
type IUseLiveList = {
	lives: Live[];
	isEmpty: boolean;
};

const mockData: Live[] = [
	{
		id: "hoge",
		title: "title1",
		thumbnail: "/thumbnail1.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: false,
	},
	{
		id: "hoge",
		title: "title2",
		thumbnail: "/thumbnail2.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: true,
	},
	{
		id: "hoge",
		title: "title3",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: false,
	},
	{
		id: "hoge",
		title: "title4",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: false,
		isMemberShip: true,
	},
	{
		id: "hoge",
		title: "title5",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: false,
	},
	{
		id: "hoge",
		title: "title6",
		thumbnail: "/thumbnail3.webp",
		date: "2021-09-01 00:00:00",
		isLive: false,
		isMemberShip: true,
	},
	{
		id: "hoge",
		title: "title7",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: true,
	},
	{
		id: "hoge",
		title: "title8",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: false,
		isMemberShip: true,
	},
	{
		id: "hoge",
		title: "title9",
		thumbnail: "/default.webp",
		date: "2021-09-01 00:00:00",
		isLive: true,
		isMemberShip: false,
	},
];
const fetcher = () =>
	new Promise<Live[]>((resolve) => {
		setTimeout(() => {
			resolve(mockData);
		}, 3000);
	});
export const useLiveList = (): IUseLiveList => {
	const { data } = useSWR<Live[]>("/api/lives", fetcher, { suspense: true });
	return { lives: data ?? [], isEmpty: data?.length === 0 };
};
