import { useMealPlannerStore } from '@/app/state/useMealPlannerStore';
import { GetGroceryListsResponse, GroceryList } from '@/app/utilities/types';

export async function getGroceryLists(token: string): Promise<void> {
    if (token === null) {
        return;
    }

    try {
        // TODO: get url based on if running locally?
        // need local ip rather than localhost since phone isn't running backend
        const response = await fetch(
            'http://192.168.0.126:8080/getGroceryLists',
            {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('getGroceryLists response not ok.');
        }

        const getGroceryListsResponse =
            (await response?.json()) as GetGroceryListsResponse;
        getGroceryListsResponse?.grocery_lists?.forEach((list) => {
            const parsedDate = new Date(list.date);
            if (Number.isNaN(parsedDate.getTime())) {
                throw new Error(
                    `Invalid date returned from grocery list: ${list.date}`
                );
            }

            useMealPlannerStore.getState().addGroceryList({
                ...list,
                date: parsedDate
            } as GroceryList);
        });
    } catch (error) {
        console.warn(`Error in getGroceryLists: ${error}`);
    }
}
