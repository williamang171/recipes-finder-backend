import { SEARCH_TYPE } from "hooks/useHttpAPI/useMealDb";

interface Props {
    searchType: string,
    searchQuery: string,
}

export default function NoRecipesFound(props: Props) {
    const { searchType, searchQuery } = props;
    if (searchQuery && searchType) {
        return <div>No recipes found with the given {searchType === SEARCH_TYPE.INGREDIENT ? "ingredient" : "meal name"}: {searchQuery}</div>
    }

    return null;
}