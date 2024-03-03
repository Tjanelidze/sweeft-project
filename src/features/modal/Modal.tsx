import { Dispatch, ReactNode, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useStatistics from '../../hooks/useStatistics';
import { ArrowDownIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 100000;
  isolation: isolate;

  & img {
    height: 500px;
  }

  & .statistics {
    display: flex;
    justify-content: space-around;
  }

  .statistics p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;

  background-color: #0000003e;
  z-index: 10000;
`;

export default function Modal({
  children,
  open,
  setIsOpen,
}: {
  children: ReactNode;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const portalElement = document.getElementById('portal')!;
  const { data } = useStatistics();

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <StyledOverlay
        onClick={() => {
          setIsOpen(false);
          searchParams.delete('imageId');
          setSearchParams(searchParams);
        }}
      >
        <StyledModal onClick={(e) => e.stopPropagation()}>
          {children}
          <div className="statistics">
            {data ? (
              <>
                <p>
                  <EyeIcon />
                  <span>{data?.views.total}</span>
                </p>
                <p>
                  <ArrowDownIcon /> <span> {data?.downloads.total} </span>
                </p>
                <p>
                  <HeartIcon />
                  <span> {data?.likes.total}</span>
                </p>
              </>
            ) : null}
          </div>
        </StyledModal>
        ;
      </StyledOverlay>
    </>,
    portalElement
  );
}
