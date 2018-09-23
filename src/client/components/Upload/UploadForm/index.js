import React, { Component } from "react";
import { connect } from "react-redux";
import {loadUploadTags, startUploading, toggleModal} from "../action";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, ListGroup, ListGroupItem, FormGroup, Collapse,
    Input, Row, Col
} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PropTypes from "prop-types";
import Select from "react-select";
import ReactDOM from 'react-dom';
import MarkdownArea from "../../MarkdownArea/index";
import {formatBytes} from "../reducer";
import {Link} from "react-router-dom";
import TagsInput from "./TagsInput";

class UploadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            title: '',
            automaticTitle: true,
            description: '',
            errors: {},
            collapse: false,
            modalDoc: false,
            modalPreview: false,
            division: false,
            course: "",
            grade: false,
            tags: [],
            newTags: [],
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSelectDivision = this.onSelectDivision.bind(this);
        this.onSelectGrade = this.onSelectGrade.bind(this);
        this.onSelectCourse = this.onSelectCourse.bind(this);
        this.onSelectTags = this.onSelectTags.bind(this);
        this.onUpdateDescription = this.onUpdateDescription.bind(this);
        this.onSelectFiles = this.onSelectFiles.bind(this);
        this.onSelectDirectories = this.onSelectDirectories.bind(this);
        this.handleUnSelectFile = this.handleUnSelectFile.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.toggleFiles = this.toggleFiles.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.cleanState = this.cleanState.bind(this);
    }



    componentDidMount() {
        console.log("Loading tags");
        this.props.loadUploadTags();


        if (this.props.user) {
            this.setState({ division: this.props.user.cuid_division })
        }
    }

    /**
     * On revision, pre-fill fields with previous version data
     */
    componentDidUpdate(prevProps) {
        if ((prevProps.upload.parentDocument ? !this.props.upload.parentDocument : this.props.upload.parentDocument)
            || (prevProps && this.props.upload.parentDocument && prevProps.upload.parentDocument.cuid !== this.props.upload.parentDocument.cuid)) {

            if (!this.props.upload.parentDocument) {
                this.cleanState();
                return;
            }

            let title = this.props.upload.parentDocument.name;

            let course;
            const division = this.props.divisions.divisions
                .find(division => division.cuid === this.props.upload.parentDocument.cuid_division);

            if (division) {
                course = division.courses.find(course => course.cuid === this.props.upload.parentDocument.cuid_course)
            }

            this.setState({
                title,
                description: this.props.upload.parentDocument.description,
                division: division ? division.cuid : undefined,
                grade: course ? course.grade: undefined,
                course: course ? course.cuid: undefined,
                tags: this.props.upload.parentDocument.tags.map((tag) => {
                    return !tag.course && !tag.division ? tag._id : undefined;
                }).filter(tag => tag)
            })
        }
    }

    toggleFiles() {
        this.setState({ collapse: !this.state.collapse });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
            automaticTitle: (e.target.value.length === 0),
        })
    }

    onSelectDivision(e) {
        if (e.value !== this.state.division) {
            this.setState({
                division: e.value,
                grade: false,
                course: [],
                errors: { ...this.state.errors, division: false },
            });
        }
    }

    onSelectGrade(e) {
        if (e.value !== this.state.grade) {
            this.setState({
                grade: e.value,
                course: [],
                errors: { ...this.state.errors, grade: false },
            });
        }
    }

    onSelectCourse(e) {
        this.setState({
            course: e.value,
            errors: { ...this.state.errors, course: e.value.length === 0 },
        });
    }

    onSelectTags(e) {
        this.setState({
            tags: e.map(v => { return (v.value) ? v.value : v })
        });
    }

    onUpdateDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onSelectFiles() {
        const uploadedFiles = this.fileInput.files;
        const files = this.state.files;

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];

            if (file && !files.find(item => file.name === item.name)) {
                files.push(file)
            }
        }

        this.setState({
            files: files,
            errors: { ...this.state.errors, files: false },
        }, () => this.updateTitle());
    }

    onSelectDirectories(e) {
        if (e.target.value === "" || !e.target.value) {
            console.log("Empty directory...");

            return;
        }

        const uploadedFiles = this.directoryInput.files;
        const files = this.state.files;

        const directory = {
            type: 'directory',
            name: '',
            files: [],
            length: 0,
            size: 0,
        };

        const path = uploadedFiles[0].webkitRelativePath;

        directory.name = path.substr(0, path.indexOf("/"));

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];

            if (file && !files.find(item => file.name === item.name)) {
                directory.files.push(file);
                directory.length++;
                directory.size += file.size;
            }
        }

        files.push(directory);

        this.setState({
            files: files,
            errors: { ...this.state.errors, files: false },
        }, () => this.updateTitle())
    }

    handleUnSelectFile(index) {
        const files = this.state.files;

        if (index !== -1) {
            files.splice(index, 1)
        }

        this.setState({
            files: files,
            errors: { ...this.state.errors, files: files.length === 0 }
        }, () => this.updateTitle());
    }

    updateTitle() {
        if (!this.state.automaticTitle || this.props.upload.parentDocument)
            return this.state.title;

        switch(this.state.files.length) {
            case 0:
                this.setState({ title : "" });
                break;
            case 1:
                this.setState({ title: this.state.files[0].name });
                break;
            default:
                this.setState({ title: "Groupe de fichier" });
                break;
        }
    }

    handleValidSubmit() {
        if (this.handleSelectErrors()) {
            return;
        }

        this.updateTitle();

        this.props.startUploading({
            description: this.state.description,
            division: this.state.division,
            grade: this.state.grade,
            course: this.state.course,
            tags: this.state.tags,
            title: this.state.title,
        }, this.state.files, this.props.upload.parentDocument);
    }

    handleInvalidSubmit() {
        this.handleSelectErrors();
    }

    // @todo custom errors on selects
    handleSelectErrors() {
        const errors = {};

        errors.files = (this.state.files.length === 0);
        errors.division = (!this.state.division);
        errors.grade = (!this.state.grade);
        errors.course = (!this.state.course);

        this.setState({ errors: errors });

        for (const key in errors) {
            if (errors.hasOwnProperty(key) && errors[key]) {
                return true;
            }
        }

        return false;
    }

    toggleModal() {
        if (!this.props.upload.modalOpened) {
            console.log("Loading tags");
            this.props.loadUploadTags();
        }

        if (this.props.upload.parentDocument) {
            this.cleanState();
        } else {
            this.setState({ errors: {} });
        }

        this.props.toggleModal();
    }

    cleanState() {
        this.setState({
            files: [],
            description: '',
            title: '',
            automaticTitle: true,
            errors: {},
            collapse: false,
            modalDoc: false,
            modalPreview: false,
            division: false,
            courses: [],
            grade: false,
            tags: [],
            newTags: [],
        });
    }

    render() {
        if (this.props.upload.tags === false) {
            console.log("Erreur de chargement des tags");

            return "";
        }

        return (
            <Modal isOpen={this.props.upload.modalOpened} toggle={this.toggleModal} style={{ top: '25%' }} >
                    <ModalHeader toggle={this.props.toggleModal}>
                        { this.props.upload.parentDocument ? "Télécharger une révision" : "Envoyer un nouveau fichier" }
                    </ModalHeader>
                    <AvForm onInvalidSubmit={this.handleInvalidSubmit} onValidSubmit={this.handleValidSubmit}>
                    <ModalBody>

                        { this.props.upload.parentDocument ?
                            <p>
                                Document à réviser :&nbsp;
                                <Link onClick={this.props.toggleModal}
                                      to={{
                                    pathname: '/document/'+this.props.upload.parentDocument.cuid,
                                    state: { document: this.props.upload.parentDocument } }}>
                                    { this.props.upload.parentDocument.name }
                                </Link>
                            </p> : ""}

                        <FormGroup>
                            <Label for="files">
                                Fichiers/dossiers à envoyer (
                                {this.state.files.length} fichiers{this.state.files.length > 1 ? "s": ""})
                            </Label>
                            <Button className="pull-right btn-xs" onClick={this.toggleFiles}>
                                { !this.state.collapse ? "Cacher" : "Afficher" }
                            </Button>
                            <Collapse isOpen={!this.state.collapse}>
                                { this.state.files.length > 0
                                    ? <ListGroup>
                                        {this.state.files.map((file, index) => {
                                            return (<ListGroupItem key={"file" + index}>
                                                { file.name } <span className="text-muted">
                                                    {file.type && file.type === "directory" ? "(répertoire - " + file.length + " fichiers - " : "(fichier - "}
                                                    taille : { formatBytes(file.size) })
                                                </span>
                                                <Button className="btn-xs pull-right" color="primary" onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleUnSelectFile(index)
                                                }}>remove</Button>
                                            </ListGroupItem>)
                                        })}
                                    </ListGroup>
                                    : <p className="text-muted text-center">Aucun fichier sélectionné</p>
                                }
                            </Collapse>
                            <Row>
                                <Button className="col-sm-6" color="primary" onClick={e => {
                                    this.fileInput.click(e)
                                }}>
                                    Envoyer des fichiers
                                    <Input type="file" multiple className="hidden" name="files" id="files"
                                           onChange={this.onSelectFiles}
                                           ref={ref => {
                                               this.fileInput = ReactDOM.findDOMNode(ref);
                                           }}/>
                                </Button>
                                <Button className="col-sm-6" color="primary" onClick={e => {
                                    this.directoryInput.click(e);
                                }}>
                                    Envoyer un répertoire
                                    <Input type="file" multiple className="hidden" name="directories" id="directories"
                                           onChange={this.onSelectDirectories}
                                           ref={ref => {
                                               const dom = ReactDOM.findDOMNode(ref);
                                               this.directoryInput = dom;

                                               if (dom) {
                                                   dom.setAttribute("webkitdirectory", "");
                                                   dom.setAttribute("directory", "");
                                               }
                                           }} />
                                </Button>
                            </Row>
                            { this.state.errors.files ?
                                <p className="text-danger invalid-feedback">
                                    Vous devez sélectionner au moins un fichier ou dossier
                                </p> : "" }
                        </FormGroup>

                        <AvGroup>
                            <Label for="title" >Titre de la synthèse</Label>
                            <AvInput name="title" id="title" type="text"
                                 value={this.state.title}
                                 onChange={this.onChangeTitle}
                                 placeholder={'Titre de la synthese. Laisser vide pour un titre automatique'}
                            />
                        </AvGroup>

                        <AvGroup>
                            <Label for="description" >Description</Label>
                            <AvInput name="description" type="textarea" id="description"
                                     value={this.state.description}
                                     placeholder={'Description de l\'upload.\nUne preview avec Markdown est disponible ci-dessus.'}
                                     onChange={this.onUpdateDescription}
                                     required
                            />
                            <AvFeedback>Ce champ est obligatoire</AvFeedback>
                            <a href="#" onClick={() => this.setState({ ...this.state, modalPreview: true })}>Afficher une preview</a>
                            <Modal size="lg" isOpen={this.state.modalPreview} toggle={() => this.setState({ ...this.state, modalPreview: false })}>
                                <ModalHeader>Description - markdown preview</ModalHeader>
                                <ModalBody>
                                    {this.state.description.length > 0
                                        ? <MarkdownArea content={this.state.description}/>
                                        : <p className="text-muted">Aucune description définie pour l'instant</p> }
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => this.setState({ ...this.state, modalPreview: false })}>Ok</Button>{' '}
                                </ModalFooter>
                            </Modal>
                            &nbsp;&nbsp;-&nbsp;&nbsp;
                            <a href="#" onClick={() => this.setState({ ...this.state, modalDoc: true })}>Documentation markdown</a>
                            <Modal size="lg" isOpen={this.state.modalDoc} toggle={() => this.setState({ ...this.state, modalDoc: false })}>
                                <ModalHeader>Documentation Markdown</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col sm="6">
                                            <div className="text-muted text-center">Code markdown</div>
                                            Markdown doc HERE
                                        </Col>
                                        <Col sm="6">
                                            <div className="text-muted text-center">Résultat</div>
                                            <MarkdownArea content="Markdown doc HERE"/>
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => this.setState({ ...this.state, modalDoc: false })}>Ok</Button>{' '}
                                </ModalFooter>
                            </Modal>
                        </AvGroup>


                        <FormGroup>
                            {/* Select pour la division */}
                            <Label for="division">Division</Label>
                            <Select
                                id="division"
                                name='division'
                                value={this.state.division}
                                options=
                                    { this.props.divisions.divisions.filter(division => !division.logicalDelete).map(division => {
                                        return {
                                            value: division.cuid,
                                            label: division.acronym,
                                        };
                                    }) }
                                clearable={false}
                                onChange={this.onSelectDivision}
                                required
                            />
                            { this.state.errors.division ? <p className="text-danger invalid-feedback">Vous devez sélectionner une division</p> : "" }
                        </FormGroup>

                        <FormGroup>
                            {/* Select pour les grades */}
                            <Label for="grade">Grade</Label>
                            <Select
                                id="grade"
                                name='grade'
                                value={this.state.grade}
                                options=
                                    { this.state.division ? this.props.divisions.divisions
                                        .find(division => division.cuid === this.state.division )
                                        .grades.filter(item => item)
                                        .map(grade => {
                                            return {
                                                value: grade.grade,
                                                label: grade.name
                                            };
                                        }) : []
                                    }
                                onChange={this.onSelectGrade}
                                clearable={false}
                                disabled={!this.state.division}
                                required
                            />
                            { this.state.errors.grade ? <p className="text-danger invalid-feedback">Vous devez sélectionner un grade</p> : "" }
                        </FormGroup>

                        <FormGroup>
                            <Label for="cours">Cours</Label>
                            <Select
                                id="cours"
                                name='cours'
                                value={this.state.course}
                                options=
                                    { this.state.division && this.state.grade ? this.props.divisions.divisions
                                        .find(division => division.cuid === this.state.division )
                                        .courses
                                        .filter(course => !course.logicalDelete && course.grade === this.state.grade)
                                        .map(course => {
                                            return {
                                                value: course.cuid,
                                                label: course.name
                                            };
                                        }) : []
                                    }
                                onChange={this.onSelectCourse}
                                required
                                clearable={false}
                                disabled={!this.state.division || !this.state.grade}
                            />
                            { this.state.errors.course ? <p className="text-danger invalid-feedback">Vous devez sélectionner un ou plusieurs cours</p> : "" }
                        </FormGroup>

                        <FormGroup>
                            {/* Select pour la tags */}
                            <Label>Tags</Label>
                            <TagsInput
                                tags={this.props.upload.tags}
                                selectedTags={this.state.tags}
                                onSelectTag={this.onSelectTags} />
                            { this.state.errors.tags ? <p className="text-danger invalid-feedback">Vous devez sélectionner un ou plusieurs tags</p> : "" }
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <FormGroup>
                                <Button type="submit" color="primary" >
                                    Upload file{this.state.files.length > 1 ? 's' : ''}
                                </Button>
                                {' '}
                                <Button color="secondary" onClick={() => {
                                    this.props.toggleModal();
                                    this.cleanState();
                                }}>
                                    Annuler
                                </Button>
                        </FormGroup>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }

}

UploadForm.propTypes = {
    upload: PropTypes.object.isRequired,
    divisions: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    startUploading: PropTypes.func.isRequired,
    parentDocument: PropTypes.object,
    loadUploadTags: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        user: state.signin.user,
        upload: state.upload,
        divisions: state.divisions,
    };
};

const mapDispatchToProps = {
    startUploading,
    toggleModal,
    loadUploadTags
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
