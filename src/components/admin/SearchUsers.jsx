import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton  from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const SearchUsers = ({userForSearch, searchUser, setUserForSearch, handleChangeSearchQuery, handleResetSearch}) => {

  return (
    <Paper
      // component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'Поиск' }}
        value={userForSearch}
        onChange={handleChangeSearchQuery}
        // onChange={(event) => searchUser(event.target.value)}
        // onKeyDown={searchUser}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="Очистить" onClick={handleResetSearch}>
        <ClearIcon />
      </IconButton>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="Поиск" onClick={searchUser}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
};

export default SearchUsers;