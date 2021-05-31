import {Dimensions} from 'react-native';
import React, {Component} from "react";

type ElementConfig<Comp, InjectedProps> = $Diff<React.ElementConfig<Comp>, InjectedProps>;

export type BreakpointsProps = {
    breakpoints: {}
};


const BreakpointsContext = React.createContext();

export class BreakpointsProvider extends Component {
    static instance: BreakpointsProvider | null = null;
    static twoColumnsBP = 700;
    static desktopModeBP = 1000;
    static desktopXLModeBP = 1200;
    static desktopXXLModeBP = 1540;

    disabled = false;

    static getInstance(): BreakpointsProvider {
        if (!BreakpointsProvider.instance) {
            throw new Error("BreakpointsProvider is not mounted yet.");
        }
        return BreakpointsProvider.instance;
    }

    state = {
        width: null,
        height: null,
        hasTwoColumns: false,
        isDesktopMode: false,
        isDesktopXLMode: false,
        isDesktopXXLMode: false
    }

    componentDidMount() {
        const { width, height } = Dimensions.get('window');
        if (BreakpointsProvider.instance !== null) {
            throw new Error("Only one BreakpointsProvider is allowed to be used.");
        }
        BreakpointsProvider.instance = this;
        this.setBreakpoints(width, height);
        Dimensions.addEventListener(
            'change',
            this.orientationChangeHandler.bind(this)
        );
    }

    componentWillUnmount (): void {
        Dimensions.removeEventListener(
            'change',
            this.orientationChangeHandler.bind(this)
        );
    }

    orientationChangeHandler(dims) {
        if (!this.disabled) {
            const {width, height} = dims.window;
            this.setBreakpoints(width, height)
        }
    }

    setBreakpoints(width, height) {
        this.setState({
            width,
            height,
            hasTwoColumns: width > BreakpointsProvider.twoColumnsBP,
            isDesktopMode: width > BreakpointsProvider.desktopModeBP,
            isDesktopXLMode: width > BreakpointsProvider.desktopXLModeBP,
            isDesktopXXLMode: width > BreakpointsProvider.desktopXXLModeBP,
        });
    }

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
        const { width, height } = Dimensions.get('window');
        this.setBreakpoints(width, height);
    }

    render() {
        return <BreakpointsContext.Provider value={this.state}>
            {this.props.children}
            </BreakpointsContext.Provider>
    }
}


export function withBreakpoints<Props: {}, Comp: React.ComponentType<Props>>(C: Comp): React.ComponentType<ElementConfig<Comp, BreakpointsProps>> {
    return class extends React.PureComponent<Props> {
        constructor(props) {
            super(props);
            this.setRef = this.setRef.bind(this);
        }
        setRef(input) {
            this.childRef = input;
        }
        render(): React.Node {
            const {props} = this;
            return (
                <BreakpointsContext.Consumer>
                    {breakpoints => <C ref={this.setRef} {...{ breakpoints }} {...props} />}
            </BreakpointsContext.Consumer>
        );
        }
    };
}
