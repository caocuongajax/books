import React, { useEffect } from "react";
import { connectToDatabase } from '../../util/mongodb'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import AdSense from 'react-adsense'
import { ObjectID } from 'mongodb'
import AOS from 'aos';

export default function Home({ book, books }) {
    // console.log(book)
    useEffect(() => {
        AOS.init({once: true});
    }, [])
    return <>
        <section className="bg-gradient-primary-to-secondary">
            <Container>
                <Row className="mb-5">
                    <Col>
                        <AdSense.Google
                            client='ca-pub-8323116050970599'
                            slot='3168302204'
                            responsive="true"
                            style={{ display: 'block' }}
                            layout='in-article'
                            format='fluid'
                        />
                    </Col>
                </Row>
                <Row className="my-5 align-items-center">
                    <Col lg="6" data-aos="fade-right">
                        {/* <h1 className="font-weight-light">{`${book.title} (${book.year})`}</h1> */}
                        <h1 className="font-weight-light text-white">{`${book.title}`}</h1>
                        {book.sub_title ? <p className="page-header-text">{book.sub_title}</p> : null}
                        {book.author ? <p className="text-white">{book.author.join(', ')}</p> : null}
                        <hr style={{borderColor: "rgb(255 255 255 / 70%)"}} />
                        <p className="page-header-text">Category: <span className="text-white">{book.category ? book.category : ''}</span></p>
                        {book.language ? <p className="page-header-text">Language: <span className="text-white">{book.language}</span></p> : null}
                        {/* {book.isbn ? <p className="page-header-text">ISBN: <span className="text-white">{book.isbn}</span></p> : null} */}
                        {book.year ? <p className="page-header-text">Year: <span className="text-white">{book.year}</span></p> : null}
                        <p className="page-header-text">Tags: <span className="text-white">{(Array.isArray(book.tags) && book.tags.length) ? book.tags.join(', ') : book.tags}</span></p>
                        {book.format ? <p className="page-header-text">Format: <span className="text-white">{book.format}</span></p> : null}
                        {book.pages ? <p className="page-header-text">Pages: <span className="text-white">{book.pages}</span></p> : null}
                        {book.file_size ? <p className="page-header-text">File size: <span className="text-white">{book.file_size}</span></p> : null}
                        {/* <p><span className="text-danger font-weight-bold">{book.imdb.rating}</span><span className="small"> / {book.imdb.votes}</span></p> */}
                        {/* <p className="text-justify">{book.plot}</p> */}

                    </Col>
                    <Col lg="6" data-aos="fade-left">
                        <div className="text-center book-cover">
                            <div className="libro">
                                {/* <span></span> */}
                                <img className="img-fluid rounded mb-4 mb-lg-0" src={book.poster} />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <a className="btn btn-lg btn-light" href={`/books/${book._id}`}>Download</a>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="svg-border-waves text-white">
                <svg className="wave" style={{ pointerEvents: "none" }} fill="currentColor" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 75">
                    <defs>
                        <style>
                            {`
                            .a {
                                fill: none;
            }
            .b {
                                clip - path: url(#a);
            }
            .d {
                                opacity: 0.5;
                isolation: isolate;
            }`}
                        </style>
                    </defs>
                    <clipPath id="a"><rect className="a" width="1920" height="75"></rect></clipPath>
                    <g className="b"><path className="c" d="M1963,327H-105V65A2647.49,2647.49,0,0,1,431,19c217.7,3.5,239.6,30.8,470,36,297.3,6.7,367.5-36.2,642-28a2511.41,2511.41,0,0,1,420,48"></path></g>
                    <g className="b"><path className="d" d="M-127,404H1963V44c-140.1-28-343.3-46.7-566,22-75.5,23.3-118.5,45.9-162,64-48.6,20.2-404.7,128-784,0C355.2,97.7,341.6,78.3,235,50,86.6,10.6-41.8,6.9-127,10"></path></g>
                    <g className="b"><path className="d" d="M1979,462-155,446V106C251.8,20.2,576.6,15.9,805,30c167.4,10.3,322.3,32.9,680,56,207,13.4,378,20.3,494,24"></path></g>
                    <g className="b"><path className="d" d="M1998,484H-243V100c445.8,26.8,794.2-4.1,1035-39,141-20.4,231.1-40.1,378-45,349.6-11.6,636.7,73.8,828,150"></path></g>
                </svg>
            </div>
        </section>
        <Container>
            <Row>
                <Col>
                    <Card className="py-4 border-0">{/** bg-light-2 shadow-sm */}
                        <Card.Body>
                            <h2>Description</h2>
                            <p className="m-0 text-justify">{book.plot}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <div className="svg-border-rounded text-light-2 pt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
        </div>
        <section className="bg-light-2">
            <Container className="pt-5">
                {/* <Card className="text-white bg-secondary mb-5 py-4 text-center">
                    <Card.Body>
                        {/* <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p> /}
                    </Card.Body>
                </Card> */}
                <Row className="mt-5">
                    {books.map((item, index) =>
                        <Col md="3" className="mb-5" key={index}>
                            <Card className="h-100 min-height-340" style={{ backgroundImage: `url(${item.poster})` }}>
                                {/* <Card.Img src={item.poster} variant="top" /> */}
                                <Card.Body>
                                    <div className="data">
                                        {/* <Card.Title className="text-truncate">{`${item.title} (${item.year})`}</Card.Title> */}
                                        <Card.Title className="text-truncate">{`${item.title}`}</Card.Title>
                                        {item.category ? <Card.Text className="text-muted text-truncate">{item.category}</Card.Text> : null}
                                        {/* <Card.Text className="text-muted text-truncate">{item.genres ? item.genres.join(', ') : ''}</Card.Text> */}
                                        <Card.Text className="text-truncate-3">{item.plot}</Card.Text>
                                        <Card.Link href={`/books/${item._id}`}>More Info</Card.Link>
                                    </div>
                                </Card.Body>
                                {/* <Card.Footer>
                <a href="#" className="btn btn-primary btn-sm">More Info</a>
                                </Card.Footer> */}
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    </>
}
export async function getServerSideProps(context) {
    const { id } = context.query
    const { db } = await connectToDatabase()

    const book = await db
        .collection("books")
        .findOne({ _id: ObjectID(id) })

    const books = await db
        .collection("books")
        .aggregate([
            {
                $match: {
                    $and: [
                        { poster: { $ne: null } },
                        { plot: { $ne: null } }
                    ]
                }
            },
            { $sample: { size: 8 } }
        ])
        .toArray();

    return {
        props: {
            book: JSON.parse(JSON.stringify(book)),
            books: JSON.parse(JSON.stringify(books))
        },
    }
}