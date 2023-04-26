import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { colors } from "../utils/colors";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect, useMemo } from "react";
import { IssueCard } from "./IssueCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  moveIssueToCompleted,
  moveIssueToActive,
  moveIssueToProgres 
} from "../features/IssuesSlice";
import { Backdrop, CircularProgress, Modal, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: colors.MAIN_BACKGROUND,
    paddingTop: '30vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  flexContainer: {
    width: '70vw',
    minHeight: '40vh',
    marginBottom: '20vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conteinerList: {
    width: '23vw',
    minHeight: '40vh',
    backgroundColor: colors.GREY_FOR_BUTTON,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  listTitleContainer: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 20,
  },
  Modal: {
    width: 350,
    height: 200,
    backgroundColor: colors.GREY_FOR_BUTTON,
    borderWidth: 0,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  ModalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  legendStar: {
    display: 'flex',
    marginLeft: 20,
  },
  startText: {
    marginLeft: 5,
  },
  legendContainer: {
    height: 50,
    width: '70vw'
  }
}))

type Props = {
  errorUrl: string | null,
  setErrorUrl: React.Dispatch<React.SetStateAction<string | null>>
}

export const ListIssues:React.FC<Props> = ({errorUrl, setErrorUrl}) => {
  const classes = useStyles();
  const {
  issuesActiveList,
  issuesCompletedList,
  issuesProgresList,
  RepoInform,
  loading,
  error,
  } = useAppSelector((store) => store.issues);
  const dispatch = useAppDispatch();

  const repoPath = useMemo(() => {
    if (!RepoInform?.full_name?.length) {
      return null;
    }

    return RepoInform?.full_name.split('/').join(' > ')
  }, [RepoInform?.full_name])

  const starsCounter = useMemo(() => {
    if (!RepoInform?.stargazers_count) {
      return null
    }

    return RepoInform?.stargazers_count > 1000 
      ? `${Math.round(RepoInform?.stargazers_count / 1000)}k stars` 
      : `${RepoInform?.stargazers_count} stars`;
  }, [RepoInform?.stargazers_count])

  const issuesCombine = useMemo(() => {

    return [
      {id: '1', title: 'ToDO', list: issuesActiveList ? issuesActiveList : []}, 
      {id: '2',title: 'In Progress',list: issuesProgresList ? issuesProgresList : []}, 
      {id: '3',title: 'Done',list: issuesCompletedList ? issuesCompletedList : []}
  ]
  }, [issuesActiveList, issuesCompletedList, issuesProgresList])

  const onDragEnd = (result: any) => {
    let selectIssues  = null;
    const selectIssueId = Number(result?.draggableId.split('_array_')[0])

    if (result?.source?.droppableId === '1' && issuesActiveList && issuesActiveList.length) {
      selectIssues = issuesActiveList?.find(issue => issue?.id === selectIssueId)
    }
    if (result?.source?.droppableId === '2' && issuesProgresList && issuesProgresList.length) {
      selectIssues = issuesProgresList?.find(issue => issue?.id === selectIssueId)
    }
    if (result?.source?.droppableId === '3' && issuesCompletedList && issuesCompletedList.length) {
      selectIssues = issuesCompletedList?.find(issue => issue?.id === selectIssueId)
    }

    if (result?.destination?.droppableId === '3' && selectIssues) {
      dispatch(moveIssueToCompleted({index: result?.destination?.index, item:selectIssues}));
    }
    if (result?.destination?.droppableId === '2' && selectIssues) {
      dispatch(moveIssueToProgres({index: result?.destination?.index, item:selectIssues}));
    }
    if (result?.destination?.droppableId === '1' && selectIssues) {
      dispatch(moveIssueToActive({index: result?.destination?.index, item:selectIssues}));
    }
  }

  return (
    <Box className={classes.container}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(loading)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className={classes.legendContainer}>
        {(starsCounter && repoPath) && (
          <Box className={classes.legend}>
            <Typography
              variant="subtitle1"
              style={{
                marginLeft: 20,
                color: colors.BLUE_FOR_BORDER
              }}
            >
              {repoPath}
            </Typography>
            <Box className={classes.legendStar}>
              <StarIcon style={{ color: 'gold' }}/>
              <Typography
                variant="subtitle1"
                className={classes.startText}
              >
                {starsCounter}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box className={classes.flexContainer}>
        <Modal
          open={Boolean(errorUrl || error)}
          onClose={() => setErrorUrl(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={classes.ModalContainer}
        >
          <Box className={classes.Modal}>
            <Typography 
              id="modal-modal-title" 
              variant="subtitle1" 
              component="h2"
              style={{
                color: colors.RED_FOR_BUTTON
              }}
            >
              ERROR!
            </Typography>
            <Typography 
              id="modal-modal-description" 
              sx={{ mt: 2 }}
              variant="subtitle2"
            >
              {errorUrl || error}
            </Typography>
          </Box>
        </Modal>
        <DragDropContext onDragEnd={onDragEnd}>
          {issuesCombine?.map((array, indexArray) => (
            <Droppable
              key={array.id}
              droppableId={array.id} 
            >
              {(provided) => (
              <Box 
                className={classes.conteinerList} 
                key={array.id} 
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Box className={classes.listTitleContainer}>
                  <Typography 
                    className={classes.listTitle}
                    variant="subtitle1"
                  >
                    {array.title}
                  </Typography>
                </Box>
                {array?.list?.map((issue, indexIssue) => (
                  <Draggable
                    index={indexIssue}
                    key={String(issue.id)}
                    draggableId={`${issue.id}_array_${array.id}`}
                  >
                    {(provided) => (
                      <IssueCard 
                        issues={issue} 
                        key={issue.id} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef} 
                      />
                    )}
                  </Draggable>
                ))}
              </Box>
              )}

            </Droppable>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  )
}