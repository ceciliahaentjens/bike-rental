import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Nullable } from '../../types';

// Mui
import { Autocomplete, TextField } from '@mui/material';

// Queries
import { SearchBike, SearchBike_searchBike } from '../../apollo/queries/__generated__/SearchBike';
import { SEARCH_BIKE } from '../../apollo/queries/searchBike';

type BikeSearchProps = {
    status: string,
    bikeId: number | undefined,
    selectedBike: Nullable<SearchBike_searchBike>,
    setSelectedBike: Dispatch<SetStateAction<Nullable<SearchBike_searchBike>>>,
}

function BikeSearch({ status, bikeId, selectedBike, setSelectedBike }: BikeSearchProps) {
    const [searchPredicate, setSearchPredicate] = useState<string>('');

    // Gestion de la recherche de vélos
    const [searchBikes, { data: searchData }] = useLazyQuery<SearchBike>(SEARCH_BIKE, {
        variables: {
            searchTerm: searchPredicate,
            status: status
        }
    });
    // On lance la recherche au fur et à mesure
    useEffect(() => {
        if (searchPredicate !== '') {
            searchBikes();
        }
    }, [searchBikes, searchPredicate]);

    return (
        <Autocomplete
            options={searchData?.searchBike ?? []}
            // Champ controlé de la partie recherche
            inputValue={searchPredicate}
            onInputChange={(event, value) => {
                setSearchPredicate(value);
            }}
            // Champ controlé de la partie selection
            value={selectedBike}
            onChange={(event, value) => {
                setSelectedBike(value);
            }}
            getOptionLabel={(option) => option.number}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, state) => {
                return <li {...props} key={option.id}>{option.number}</li>
            }}
            renderInput={(params) => <TextField {...params} label="Numéro du vélo" />}
            sx={{
                minWidth: 200,
            }}
        />
    );

}

export default BikeSearch;